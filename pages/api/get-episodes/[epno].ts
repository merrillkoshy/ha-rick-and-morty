// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";
import { env } from "process";
import axios, { AxiosResponse } from 'axios';
import { Episode } from '../../../lib/dataTypes';


const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET"]
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Episode>
) {
  await cors( req, res )
  const { epno } = req.query
  if ( req.method === "GET" ) {
    const url=`${env.EPISODES_EP as string}/episode/${epno}`
      axios.get( url ).then( ( response: AxiosResponse<Episode> ) => {
        // console.log(response)
      res.status( response.status );
      res.json( {
        id: response.data.id,
        name: response.data.name,
        air_date: response.data.name,
        episode: response.data.name,
        characters: response.data.characters,
        url: response.data.url,
        created: response.data.created,
      } )
      } ).catch( e => {
        console.log( e );
        res.status( 500 ).end()
      } )
  } else {
    res.status( 500 ).end();
  }
}
