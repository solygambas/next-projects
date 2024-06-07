import connectDB from "@/config/database";

export const GET = async (req: Request, res: Response) => {
  try {
    await connectDB();
    return new Response(JSON.stringify({ message: "Hello, world!" }), {
      status: 200,
    });
  } catch (error) {
    return new Response("An error occurred", { status: 500 });
  }
};
