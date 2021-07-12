const { events } = require("./data.json");

export default function handler(req, res) {
  const selectedEvent = events.filter(
    (singleEvent) => singleEvent.slug === req.query.slug
  );
  if (req.method === "GET") {
    res.status(200).json(selectedEvent);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}
