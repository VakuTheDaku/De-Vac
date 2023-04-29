// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"
export default async function handler(req, res) {
  try{
  const data = await axios.post("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51,51&radius=50000&key=AIzaSyCnePPRJeErgcAxMxt0kRkc0o_rHiGnlVY&type=hospital")
  res.send({data: data})
  }
  catch(err){
    res.send({error: err})
  }
}
