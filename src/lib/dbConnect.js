if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define MONGODB_URI in your environment variables (.env.local and Vercel)"
  );
}

export const uri = process.env.MONGODB_URI;
