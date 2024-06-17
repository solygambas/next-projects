import { PopulatedMessageInterface } from "@/models/Message";

const Message = ({ message }: { message: PopulatedMessageInterface }) => {
  const { body, email, phone, sender, property, createdAt } = message;
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>
        {property?.name || "No Property Name"}
      </h2>
      <p className="text-gray-700">{body || "No message body"}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {sender.username || "No name"}
        </li>

        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${email}`} className="text-blue-500">
            {email || "No email"}
          </a>
        </li>
        {phone && (
          <li>
            <strong>Reply Phone:</strong>{" "}
            <a href={`tel:${phone}`} className="text-blue-500">
              {phone}
            </a>
          </li>
        )}
        <li>
          <strong>Received:</strong> {new Date(createdAt).toLocaleString()}
        </li>
      </ul>
      <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md">
        Mark As Read
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
        Delete
      </button>
    </div>
  );
};
export default Message;
