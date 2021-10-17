import React, { MouseEventHandler } from "react";
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Characters, CharEndpoint } from '../lib/dataTypes'
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

  const [ characters, setCharacters ] = useState<CharEndpoint>( character_endpoint_skeleton );
  const [ pageNumber, setPageNumber ] = useState<number>( 1 );
  const [ visible, setVisible ] = useState<boolean>( false );
  const [ modalContent, setModalContent ] = useState<Characters>( character_skeleton )
  
  const handleOpen=()=>{setVisible(true)};
  const handleClose = () => { setVisible( false ) };
  
  const get = () => {
    getters.getCharacterEndpoint(pageNumber ).then( res => { 
      setCharacters(res)
    })
  }
  useEffect( () => {
    get();
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
           characters && characters.results?.map( ( character: Characters ) => { 
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
                  
                    <Image
                    src={character?.image}
                    height={300}
                    width={ 300 }
                    blurDataURL="/placeholder.jpeg"
                    alt={`${character?.image} image for HA`}                   
                    />
                    
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
