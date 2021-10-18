import React from "react";
import { ToastContainer } from "react-toastify";
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Characters, EndPoint } from '../lib/dataTypes'
import getters from '../lib/getData'
import { character_endpoint_skeleton, character_skeleton } from '../lib/data-skeleton'
import MastHead from '../components/MastHead'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentModal from '../components/ContentModal'
import PaginationComponent from "../components/Pagination";
import { Card, Spinner } from "react-bootstrap";
import Image from "next/image";

const Home: NextPage = () => {

  const [ characters, setCharacters ] = useState<EndPoint>( character_endpoint_skeleton );
  const [ pageNumber, setPageNumber ] = useState<number>( 0 );
  const [ visible, setVisible ] = useState<boolean>( false );
  const [ modalContent, setModalContent ] = useState<Characters>( character_skeleton )

  const handleOpen=()=>{setVisible(true)};
  const handleClose = () => { setVisible( false ) };
  
  const get = (page:number) => {
    getters.getCharacterEndpoint( page ).then( res => { 
      setCharacters(res)
    })
  }

  useEffect( () => {

    if(pageNumber===0) return get(1)
    return () => {
      setVisible( false );
      setModalContent(character_skeleton)
    }
  }, [pageNumber])
  
  return (

    <div className={"app-container"}>
      <Header/>
      <main className="content-container px-2 ">
        <MastHead/>

        <div className="d-flex flex-row flex-wrap content-area justify-content-center align-items-center">
        { characters.results.length === 0 ? <Spinner animation="border" variant="primary" />: 
           characters && (characters.results as Characters[])?.map( ( character : Characters ) => { 
            return (
              <Card key={ character?.id }
                className="character-card"
                onClick={ (e:React.MouseEvent<HTMLInputElement> ) => {
                  e.preventDefault();
                  handleOpen();
                  setModalContent(character)
                }}
              >
                <Card.Body>
                  {character?.image?
                    <Image
                    src={character?.image}
                    height={300}
                    width={ 300 }
                    loading="lazy"
                    blurDataURL="/placeholder.jpeg"
                    alt={`${character?.image} image for HA`}                   
                    />:<Spinner animation="border" variant="primary" />}
                    
                  <div className="info-box d-flex mt-3 flex-column">
                    <h2>{ character?.name }</h2>
                    <span className="d-flex align-items-center"><span className={ `status status-${character?.status.toLowerCase()}`}></span>{ `${character?.species}-${character?.status}`}</span>
                    <h3>Origin</h3>
                    <p>{ character.origin?.name }</p>
                    <h3>Location</h3>
                    <p>{ character.location?.name }</p>
                    
                    </div>

                </Card.Body>
                <Card.Footer>
                <a className='more' onClick={ (e) => { 
                      e.preventDefault();
                      handleOpen();
                      setModalContent(character)
                    }}>More &rarr;</a>
                </Card.Footer>
              </Card>
              
            )
          })}
        </div>
        <ContentModal
          visible={ visible }
          modalContent={ modalContent }
          handleClose={handleClose}
        />
      </main>

      <PaginationComponent
        count={ characters.info?.count }
        pages={characters.info?.pages}
        next={characters.info?.next}
        prev={ characters.info?.prev }
        setPageNumber={ setPageNumber }
        get={get}
      />
      <Footer />
      </div>

  )
}

export default Home
