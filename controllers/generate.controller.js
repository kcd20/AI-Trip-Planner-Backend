import { GoogleGenerativeAI } from "@google/generative-ai";

export const postGenerateTrip = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "request body is empty" });
  }
  const {
    destinations,
    lengthOfTrip,
    arrivalAirport,
    departureAirport,
    timeOfArrival,
    timeOfDeparture,
  } = req.body;

  const prompt = `Create a travel itinerary for Japan based on the following details: Destination(s): ${destinations.join(
    ","
  )}, Length of Trip: ${lengthOfTrip} day(s), ${
    arrivalAirport && `Arrival Airport: ${arrivalAirport},`
  } ${departureAirport && `Departure Airport: ${departureAirport},`} ${
    timeOfArrival ? `Time of Arrival: timeOfArrival,` : ""
  } ${timeOfDeparture ? `Time of Departure: timeOfDeparture` : ""}`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    console.log(prompt);
    const result = await model.generateContent(prompt);
    const response = result.response;
    res.status(200).json(response.text());
  } catch (error) {
    console.error("Error fetching response from Gemini:", error);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
};
