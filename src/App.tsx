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

  }

  return (
   <C.Container>
    <C.Info>
      <C.LogoLink href="">
        <img src={devmemory} width="200" alt="" />
      </C.LogoLink>
      <C.InfoArea>
        <InfoItem label="Tempo" value={formatTimerElapsed(timeElapsed)}/>
        <InfoItem label="Movimentos" value="00"/>
      </C.InfoArea>
      <Button label='Reniciar' onClick={resetAndCreateGrid} icon={RestartIcon} />
    </C.Info>

    <C.GridArea>
      <C.Grid>
        {gridItems.map((item, index) => (
          <GridItem key={index} item={item} onClick={() => handleItemClick} />
        ))}
      </C.Grid>
    </C.GridArea>
   </C.Container>
  )
}

export default App