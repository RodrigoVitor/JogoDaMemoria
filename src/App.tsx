import { useEffect, useState } from 'react'
import * as C from './App.styles'
import devmemory from './assets/devmemory_logo.png'
import { Button } from './components/Button'
import { InfoItem } from './components/InfoItem'
import { items } from './data/item'
import RestartIcon from './svgs/restart.svg'
import { GridItemType } from './types/GridItemType'

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCOunt, setMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => resetAndCreateGrid, [])

  const resetAndCreateGrid = () => {
    // paso 1 - resetar o jogo
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)
    //passo 2 - criar grid
    //2.1 - Criar grid vazio
    let tmpGrid: GridItemType[] = []
    for(let i=0; i < (items.length * 2 ); i++) {
      tmpGrid.push({
        item: null,
        permanentShow: false,
        shown: false
      })

    for (let w = 0; w < 2; w++){
      for(let i = 0; i < items.length; i ++) {
        let pos = -1
        while (pos < 0 || gridItems[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2))
        }
        tmpGrid[pos].item = i
      }
    }
    }

    //2.2 - preencher o grid

    //2.3 jogar no state
    setGridItems(gridItems)

    // passo 3 - começar o jogo
    setPlaying(true)
  }

  return (
   <C.Container>
    <C.Info>
      <C.LogoLink href="">
        <img src={devmemory} width="200" alt="" />
      </C.LogoLink>
      <C.InfoArea>
        <InfoItem label="Tempo" value="00:00"/>
        <InfoItem label="Movimentos" value="00"/>
      </C.InfoArea>
      <Button label='Reniciar' onClick={resetAndCreateGrid} icon={RestartIcon} />
    </C.Info>

    <C.GridArea>
      <C.Grid>
      
      </C.Grid>>
    </C.GridArea>
   </C.Container>
  )
}

export default App