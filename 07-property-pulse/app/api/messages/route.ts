import connectDB from "@/config/database";
import Message, { BaseMessageAPIInterface } from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// POST /api/messages
export const POST = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { user } = sessionUser;
    const {
      recipient,
      property,
      name,
      email,
      phone,
      body,
    }: BaseMessageAPIInterface = await req.json();
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "Cannot send message to yourself" }),
        { status: 400 }
      );
    }
    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body,
    });
    await newMessage.save();
    return new Response(JSON.stringify({ message: "Message sent" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 500 });
  }
};
