// websocket = new WebSocket(document.myform.url.value);
// websocket.onopen = function(evt) { onOpen(evt) };
// websocket.onclose = function(evt) { onClose(evt) };
// websocket.onmessage = function(evt) { onMessage(evt) };
// websocket.onerror = function(evt) { onError(evt) };

let joueur = {}
let enchere = true
let state = "enchere"
let lvlenchere = 0
var ws = undefined

window.onload = ()=>{
    let ip = prompt("quelle-est l'adresse-ip du serveur ?")
    ws = new WebSocket(ip)
    let name = ""
    ws.onopen = ()=>{
        name = prompt("Quel sera votre pseudonyme ? ")
        ws.send(JSON.stringify({
            "op":1,
            "data":{
                "nom":name
            }
        }))
        document.getElementById("#bottomname").innerText = name
    }
    // marche !!!!
    ws.onerror = ()=>{
        console.log("rer")
    }
    ws.onclose = ()=>{
        console.log("ere")
    }
    ws.onmessage = msg => {
        const d = JSON.parse(msg.data)
        switch (d.op) {
            case 1:
                // TODO
                break
            case 2:
                addtoJ(d.data.carte)
                console.log(d.data.joueur,d)
                document.getElementById("#topname").innerText = d.data.joueur.top
                document.getElementById("#leftname").innerText = d.data.joueur.left
                document.getElementById("#rightname").innerText = d.data.joueur.right

                joueur = d.data.joueur
                break
            case 3:
                document.getElementById("lvlench").innerText = "Joueur enchère : "+d.data.joueur + `(${d.data.lvl})`
                lvlench=d.data.lvl
                break
            case 4:
                document.getElementById("lvlench").innerText = "Joueur qui a pris : "+d.data.joueur
                enchere=false
                state="wtp"
                if(name==d.data.joueur){
                    state="chien"
                    addtoJ(d.data.chien)
                    document.getElementById("bplay").innerText = "Chien"
                    unlockall()
                }
                else{
                    drawchien(d.data.chien)
                    document.getElementById("bplay").style.display = "none"
                }
                document.getElementById("benchere").style.display = "none"
                break
            case 5:
                console.log(joueur[d.data.joueur],joueur,d)
                playertoplay(d.data.carte,joueur[d.data.joueur],true)
                break
            case 6:
                document.getElementById('gprec').innerText = "Le gagnant du tour précédent : "+ d.data.prenneur ? "prenneur":"les autres joueurs"
                // clear()
                lockall()
                if(d.data.prenneur){
                    leftwin()
                }
                else{
                    righttwin()
                }
                setTimeout(()=>{
                    clear()
                    lockall()
                },1500)
                break
            case 7:
                // let str =  ' le gagnant.s est/sont :' +d.data.joueur.join(", ") + "avec :"+d.data.pts+" GG à lui"
                let str = ""
                if (d.data.joueur){
                    str = "Le prenneur gagne avec " + d.data.pts+" points, félicitation à lui"
                }
                else{
                    str = "Le prenneur n'a pas réussi son contrat ! Le reste du groupe gagne avec "+ (91-d.data.pts) +" points, félicitation à eux !"
                }
                alert(str)
                break
            case 8:
                state="play"
                lockallbottom()
                setTimeout(()=>unlock(),1600)
                document.getElementById("bplay").style.display = "inline"
                console.log(d)
                let t = d.data.carte
                console.log(t)
                for(let i = 0;i<t.length;i++){
                    unlockid(t[i])
                }
                break
            case 9:
                clearall()
                lockall()
                document.getElementById("bplay").innerText = "Jouer"
                break
            case 10:
                alert(d.data.err)
                break
            case 11:
                lockallbottom()
                let e = d.data.carte
                console.log(e)
                for(let i = 0;i<e.length;i++){
                    unlockid(e[i])
                }
                break
        }
    }
}