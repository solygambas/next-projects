// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }
    // console.log(email);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
