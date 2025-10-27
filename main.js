const canvas=document.getElementById("canvas")
const ctx=canvas.getContext("2d")

const csize=canvas.width
const bsize=8

let sel={}
let key={}
let bstart=false

let board = [
  "r","p","","","","","P","R","n","p","","","","","P","N","b","p","","","","","P","B","q","p","","","","","P","Q","k","p","","","","","P","K","b","p","","","","","P","B","n","p","","","","","P","N","r","p","","","","","P","R"
]

const atlas=[
  "P","pawn","p","pawnb","N","knight","n","knightb","B","bishop","b","bishopb","R","rook","r","rookb","Q","queen","q","queenb","K","king","k","kingb"
]

function squareTap(pos){
  const x=Math.floor(pos.x/csize*bsize)
  const y=Math.floor(pos.y/csize*bsize)
  const piece=board[sel.y+sel.x*bsize]
  if(sel.x>=0&&piece!=""){
    board[sel.y+sel.x*bsize]=""
    board[y+x*bsize]=piece
    sel.x=undefined
    sel.y=undefined
  }else{
    sel.x=x
    sel.y=y
  }
}

function drawBoard(){
  for(let y=0;y<8;y++){
    for(let x=0;x<8;x++){
      ctx.fillStyle=(x+y)%2==0?"white":"black"
      ctx.fillRect(x/bsize*csize,y/bsize*csize,csize/bsize,csize/bsize)
    }
  }
  if(sel){
    ctx.fillStyle="red"
    ctx.fillRect(sel.x/bsize*csize,sel.y/bsize*csize,csize/bsize,csize/bsize)
  }
  for(let y=0;y<8;y++){
    for(let x=0;x<8;x++){
      const squ=board[y+x*bsize]
      for(let i=0;i<atlas.length/2;i++){
        if(squ==atlas[i*2]){
          ctx.drawImage(document.getElementById(atlas[i*2+1]),x/bsize*csize,y/bsize*csize,csize/bsize,csize/bsize)
        }
      }
    }
  }
}
function addPiece(piece){
  let stop=false
  for(let y=0;y<8;y++){
    for(let x=0;x<8;x++){
      const squ=board[y+x*bsize]
      if(squ==""){
        board[y+x*bsize]=piece
        stop=true
      }
      if(stop){
        break
      }
    }
    if(stop){
      break
    }
  }
}

drawBoard()

function tapPos(event) {
  const rect=canvas.getBoundingClientRect()
  let x,y

  if (event.touches){
    x=event.touches[0].clientX-rect.left
    y=event.touches[0].clientY-rect.top
  } else {
    x=event.clientX-rect.left
    y=event.clientY-rect.top
  }
  return {x,y}
}

canvas.addEventListener("click", (event) => {
  const pos=tapPos(event)
  squareTap(pos)
})

function render(){
  drawBoard()
  if(key.j&&(key.p||key.n||key.b||key.r||key.q||key.k)&&bstart){
    const pec=(key.p?"p":key.n?"n":key.b?"b":key.r?"r":key.q?"q":key.k?"k":"")
    addPiece(key.w?pec.toUpperCase():pec)
    bstart=false
  }
  requestAnimationFrame(render)
}

render()

document.addEventListener("keydown",e=>{
  key[e.key]=true
  bstart=true
})
document.addEventListener("keyup",e=> key[e.key]=false)

const keyboard="qwertyuiopasdfghjklzxcvbnm"

for(let i=0;i<10;i++){
  let btn=document.createElement("button")
  btn.className="key"
  btn.innerHTML=keyboard[i]
  btn.addEventListener("touchstart",e=>{
    e.preventDefault()
    key[keyboard[i]]=true
    bstart=true
  })
  btn.addEventListener("touchend",e=>{
    e.preventDefault()
    key[keyboard[i]]=false
  })
  document.getElementById("keyb1").appendChild(btn)
}
for(let i=10;i<19;i++){
  let btn=document.createElement("button")
  btn.className="key"
  btn.innerHTML=keyboard[i]
  btn.addEventListener("touchstart",e=>{
    e.preventDefault()
    key[keyboard[i]]=true
    bstart=true
  })
  btn.addEventListener("touchend",e=>{
    e.preventDefault()
    key[keyboard[i]]=false
  })
  document.getElementById("keyb2").appendChild(btn)
}
for(let i=19;i<26;i++){
  let btn=document.createElement("button")
  btn.className="key"
  btn.innerHTML=keyboard[i]
  btn.addEventListener("touchstart",e=>{
    e.preventDefault()
    key[keyboard[i]]=true
    bstart=true
  })
  btn.addEventListener("touchend",e=>{
    e.preventDefault()
    key[keyboard[i]]=false
  })
  document.getElementById("keyb3").appendChild(btn)
}

document.getElementById("keyb").style.display="none"