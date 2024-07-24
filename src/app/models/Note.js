import mongoose from 'mongoose';
import slugify from 'slugify';  // Using slugify for generating slugs

const NoteSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  details: [{
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      label: String,
      value: String
    },
    status: {
      type: String,
      enum: ["Completed", "InComplete"],
      default: "InComplete",
    },
  }],
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  slug: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
});

// Middleware to generate slug before saving
NoteSchema.pre('save', async function (next) {
  if (this.isModified('date') || this.isNew) {
    const dateSlug = slugify(this.date.toISOString().split('T')[0], { lower: true, strict: true });

    // Check for uniqueness and handle conflicts
    let slug = dateSlug;
    let counter = 1;
    while (await mongoose.models.Note.exists({ slug })) {
      slug = `${dateSlug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
});

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default Note;
