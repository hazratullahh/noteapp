import React, { Suspense } from "react"
import ChipPills from "./components/ChipPills"
import { CardHome } from "./components/CardHome"
import CardSkeleton from "./components/skeleton/CardSkeleton"
import ChipPillSleleton from "./components/skeleton/ChipPillSleleton"
import AddNewNote from "./components/AddNewNote"
import connectDB from "./lib/connectDB"
import Note from "./models/Note"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function fetchDailyTaskStats(category) {
  "use server";
  try {
    await connectDB();

    const matchStage = category
      ? { $match: { "details.category.value": category } }
      : { $match: {} };

    const dailyStats = await Note.aggregate([
      matchStage,
      {
        // Unwind the details array to de-normalize the data
        $unwind: "$details"
      },
      {
        // Group by date and accumulate the necessary counts and arrays
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Group by date (YYYY-MM-DD)
          completedCount: {
            $sum: { $cond: [{ $eq: ["$details.status", "Completed"] }, 1, 0] }
          },
          incompleteCount: {
            $sum: { $cond: [{ $eq: ["$details.status", "InComplete"] }, 1, 0] }
          },
          totalCount: { $sum: 1 },
          categories: { $addToSet: "$details.category" },
          slug: { $first: "$slug" }, // Assuming the slug is present at the document level
          createdAt: { $first: "$createdAt" } // Include createdAt field
        }
      },
      {
        // Project the final shape of the data
        $project: {
          _id: 0,
          date: "$_id",
          completedCount: 1,
          incompleteCount: 1,
          totalCount: 1,
          categories: 1,
          slug: 1,
          createdAt: 1
        }
      },
      {
        // Sort by date descending
        $sort: { date: -1 }
      }
    ]);

    return {
      status: "fulfilled",
      data: dailyStats
    };
  } catch (error) {
    console.error("Error fetching daily task stats:", error);
    return {
      status: "rejected",
      error: error.message
    };
  }
}


const page = async ({ searchParams }) => {
  async function create(formData) {
    "use server"
    try {
      await connectDB();

      await Note.create({
        date: formData["date"],
        details: [
          {
            title: formData["title"],
            content: formData["content"],
            category: {
              label: formData["category"]["label"],
              value: formData["category"]["value"]
            },
            status: formData["completed"] ? "Completed" : "InComplete"
          }
        ]
      });

      // if (!params.slug) {
      //   console.log("creatig");
      //   await Note.create({
      //     date: formData["date"], 
      //     details: [
      //       {
      //         title: formData["title"],
      //         content: formData["content"],
      //         category: {
      //           label: formData["category"]["label"],
      //           value: formData["category"]["value"]
      //         },
      //         status: formData["completed"] ? "Completed" : "InComplete"
      //       }
      //     ]
      //   });

      // } else {
      //   await Note.findOneAndUpdate(
      //     { slug: params.slug },
      //     {
      //       $push: {
      //         details: {
      //           title: formData["title"],
      //           content: formData["content"],
      //           category: {
      //             label: formData["category"]["label"],
      //             value: formData["category"]["value"]
      //           },
      //           status: formData["completed"] ? "Completed" : "InComplete"
      //         }
      //       },
      //     },
      //     { new: true } // Return the updated document
      //   );
      // }

      revalidatePath("/")
      redirect('/')
    } catch (error) {
      // toast.error(error)
      console.error("Error Creating Note:", error);
      // redirect('/dashboard')
    }
  }

  const notes = await fetchDailyTaskStats(searchParams.category)

  return (
    <>
      <div className="mx-5 lg:mx-auto max-w-screen-2xl flex justify-end mt-3">
        <AddNewNote isStep={true} create={create} />
      </div>
      {notes.data.length === 0 ?
        <h2 className="text-center text-lg pt-36 lg:text-5xl">Create Your First Note!</h2>
        :
        <section className="mx-auto max-w-screen-2xl mt-5 py-2 lg:py-4 px-4 lg:mt-5">
          <div className="flex justify-between items-center gap-3 overflow-x-scroll border-b-2 border-blue-gray-900 lg:border-0">
            <Suspense fallback={<ChipPillSleleton />}>
              <ChipPills />
            </Suspense>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-5 my-10 lg:my-10">
            <Suspense fallback={<CardSkeleton />}>
              {
                notes?.data?.map(note => <CardHome key={note?.date} note={note} />)
              }
            </Suspense>
          </div>
        </section>
      }
    </>
  )
}

export default page