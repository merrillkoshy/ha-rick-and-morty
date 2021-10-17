import React from "react";
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Characters, CharEndpoint } from '../lib/dataTypes'
import getters from '../lib/getData'
import styles from '../styles/Home.module.css'
import { character_endpoint_skeleton, character_skeleton } from '../lib/data-skeleton'
import MastHead from '../components/MastHead'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentModal from '../components/ContentModal'

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
    console.log(characters)
    return () => {
      setVisible( false );
      setModalContent(character_skeleton)
    }
  }, [pageNumber])
  
  

  return (
    <div className={styles.container}>
      <Header/>
      <main className="content-container px-2 ">
        <MastHead/>

        <div className="d-flex flex-row flex-wrap content-area justify-content-center align-items-center">
          { characters && characters.results?.map( ( character: Characters ) => { 
            return (
              <div
                key={ character?.id }
                className="character-card"
                onClick={ e => {
                  e.preventDefault();
                  setVisible( true );
                  setModalContent(character)
                }}
              >
                <img src={character?.image } />
                <h2>{ character?.name }</h2>
                <span className="d-flex align-items-center"><span className={ `status status-${character?.status.toLowerCase()}`}></span>{ `${character?.species}-${character?.status}`}</span>
                <h3>Origin</h3>
                <p>{ character.origin?.name }</p>
                <h3>Location</h3>
                <p>{ character.location?.name }</p>
                <a className='more' onClick={ (e) => { 
                  e.preventDefault();
                  setVisible( true );
                  setModalContent(character)
                }}>More &rarr;</a>
          </div>
            )
          })}
        </div>
        <ContentModal
          visible={ visible }
          modalContent={ modalContent }
          handleClose={handleClose}
        />
      </main>

      <Footer
        count={ characters.info?.count }
        pages={characters.info?.pages}
        next={characters.info?.next}
        prev={ characters.info?.prev }
        setPageNumber={ setPageNumber }
        get={get}
    />
    </div>
  )
}

export default Home
