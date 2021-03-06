// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";
import { env } from "process";
import axios, { AxiosResponse } from 'axios';
import { EndPoint } from '../../../lib/dataTypes';


const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET"]
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EndPoint>
) {
  await cors( req, res )
  const { page } = req.query
  if ( req.method === "GET" ) {
    const url=`${env.CHARACTERS_EP as string}?page=${page}`
      axios.get( url ).then( ( response: AxiosResponse<EndPoint> ) => {
      res.status( response.status );
      res.json( {
        info:{
          count: response.data.info.count,
          pages: response.data.info.pages,
          next: response.data.info.next,
          prev: response.data.info.prev,
        },
        results: response.data.results
      } )
    }).catch(e=>res.status( 500 ).end())
  } else {
    res.status( 500 ).end();
  }
}
