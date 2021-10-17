// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { env } from "process";
import axios, { AxiosResponse } from 'axios';
import { Routes } from '../../lib/dataTypes';



const baseURL = env.BASE_URL as string;
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET"]
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Routes>
) {
  await cors( req, res )
  
  if ( req.method === "GET" ) {
    axios.get( baseURL ).then( (response:AxiosResponse<Routes>) => {
      res.status( response.status );
      res.json( {
        characters: response.data?.characters,
        locations: response.data?.locations,
        episodes:response.data?.episodes,
      })
    }).catch(e=>res.status( 500 ).end())
  } else {
    res.status( 500 ).end();
  }
}
