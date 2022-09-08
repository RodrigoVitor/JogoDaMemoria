import { useEffect, useState } from 'react'
import * as C from './App.styles'

import { Button } from './components/Button'
import { GridItem } from './components/GridItem'
import { InfoItem } from './components/InfoItem'

import { GridItemType } from './types/GridItemType'
import { items } from './data/item'

import RestartIcon from './svgs/restart.svg'
import devmemory from './assets/devmemory_logo.png'
import { formatTimerElapsed } from './helpers/formatTimerElapsed'

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => resetAndCreateGrid, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) {
        setTimeElapsed(timeElapsed + 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  useEffect(() => {
    if(shownCount === 2) {
    //Verificar se os abertos são iguais
      let opened = gridItems.filter(item => item.shown === true)
      if(opened.length === 2) {
        if(opened[0].item === opened[1].item) {
        //v1 - se eles foram iguais, tornarem permanentes
        let tmpGrid = [...gridItems]

          for(let i in tmpGrid) {
            if(tmpGrid[i].shown) {
              tmpGrid[i].permanentShow = true
              tmpGrid[i].shown = false
            }
          }
          setGridItems(tmpGrid)
          setShownCount(0)
        } else {
          //v2 - Se não são iguais fechar todos os icones
          let tmpGrid = [...gridItems]

          setTimeout(() => {
            for( let i in tmpGrid) {
              tmpGrid[i].shown = false 
            }
            setGridItems(tmpGrid)
            setShownCount(0)
          }, 1000)
        }
        
        setMoveCount(moveCount => moveCount + 1)
      } 
    }
  },[shownCount, gridItems])

  //verificar se o jogo acabou
  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShow === true)) {
      setPlaying(false)
    }
  },[moveCount, gridItems])

  const resetAndCreateGrid = () => {
    // paso 1 - resetar o jogo
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)

    //passo 2 - criar grid
    //2.1 - Criar grid vazio
    let tmpGrid: GridItemType[] = []
    for(let i=0; i < (items.length * 2 ); i++) {
      tmpGrid.push({ item: null, permanentShow: false, shown: false })
    }

    for (let w = 0; w < 2; w++){
      for(let i = 0; i < items.length; i++) {
        let pos = -1
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2))
        }
        tmpGrid[pos].item = i
      }
    }

    //2.2 - preencher o grid

    //2.3 jogar no state
    setGridItems(tmpGrid)

    // passo 3 - começar o jogo
    setPlaying(true)
  }

  const handleItemClick = (index: number) => {
    if(playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems]
      
      if (tmpGrid[index].permanentShow === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true
        setShownCount(shownCount + 1)
      }

      setGridItems(tmpGrid)
    }
  }

  return (
   <C.Container>
    <C.Info>
      <C.LogoLink href="">
        <img src={devmemory} width="200" alt="" />
      </C.LogoLink>
      <C.InfoArea>
        <InfoItem label="Tempo" value={formatTimerElapsed(timeElapsed)}/>
        <InfoItem label="Movimentos" value={moveCount.toString()}/>
      </C.InfoArea>
      <Button label='Reniciar' onClick={resetAndCreateGrid} icon={RestartIcon} />
    </C.Info>

    <C.GridArea>
      <C.Grid>
        {gridItems.map((item, index) => (
          <GridItem key={index} item={item} onClick={() => handleItemClick(index)} />
        ))}
      </C.Grid>
    </C.GridArea>
   </C.Container>
  )
}

export default App