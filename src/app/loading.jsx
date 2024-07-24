import {
  Card,
  CardBody,
  CardFooter,
  Button,
} from "../material-tailwind/page";
import ChipPillSleleton from "./components/skeleton/ChipPillSleleton";

const Loading = () => {
  return (
    <section className="mx-auto max-w-screen-2xl mt-5 py-2 lg:py-4 px-4 lg:mt-10">
      <div className="flex justify-between items-center gap-3 overflow-x-scroll border-b-2 border-blue-gray-900 lg:border-0">
        <ChipPillSleleton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-5 my-10 lg:my-20">
        <Card className="mb-4 w-auto animate-pulse">
          <CardBody>
            <div className="flex gap-2 mb-4 w-4/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 w-4/6 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 mt-7 w-11/12/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 w-11/12/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button size="sm" variant="text" className="flex items-center gap-2 animate-pulse bg-gray-200">
              ...
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </CardFooter>
        </Card>
        <Card className="mb-4 w-auto animate-pulse">
          <CardBody>
            <div className="flex gap-2 mb-4 w-4/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 w-4/6 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 mt-7 w-11/12/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 w-11/12/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button size="sm" variant="text" className="flex items-center gap-2 animate-pulse bg-gray-200">
              ...
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </CardFooter>
        </Card>
        <Card className="mb-4 w-auto animate-pulse">
          <CardBody>
            <div className="flex gap-2 mb-4 w-4/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 w-4/6 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 mt-7 w-11/12/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 w-11/12/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button size="sm" variant="text" className="flex items-center gap-2 animate-pulse bg-gray-200">
              ...
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </CardFooter>
        </Card>
        <Card className="mb-4 w-auto animate-pulse">
          <CardBody>
            <div className="flex gap-2 mb-4 w-4/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 w-4/6 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 mt-7 w-11/12/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
            <div className="flex gap-2 mb-5 w-11/12/12 bg-gray-200 rounded-full">
              <span className="invisible">ChipPills</span>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button size="sm" variant="text" className="flex items-center gap-2 animate-pulse bg-gray-200">
              ...
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

export default Loading