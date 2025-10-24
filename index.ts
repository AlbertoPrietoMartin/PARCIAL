import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

console.log("MI EXAMEN PARCIAL");

type LD = {
id: number,
filmName: string,
rotationType: `CAV` | `CLV`,
region: string,
lengthMinutes: number,
videoFormat: `NTSC`  | `PAL`,
}

let lasPelis: LD[] = [

 { id: 1, filmName: "SPAIDERMAN", rotationType: `CAV`, region: "NUEVAYOL", lengthMinutes: 100,  videoFormat: `PAL` },

 { id: 2, filmName: "club de la lucha", rotationType: `CLV`, region: "QUEENS", lengthMinutes: 120,  videoFormat: `NTSC` },

];

app.get("/", (req, res) => {
    res.send("Te has conectado!, vamonos que esto funcionaaaa");
});

app.listen(port, () => {
    console.log("Esto funcionaaaa y estás en el puerto: " + port);
});

//pa todos
app.get("/lasPelis", (req,res)=>{
    res.json(lasPelis);
})

//especifico
app.get("/lasPelis/:id", (req,res)=>{
    const idParams = req.params.id;
    const verdaderoId = Number(idParams)
    const aBuscar = lasPelis.find((elem)=> elem.id === verdaderoId)
        
        aBuscar ? res.json(aBuscar) : res.status(404).json({
            error: "Disco no encontrado"
        });
});

//añadir uno nuevo
app.post("/lasPelis", (req, res)=>{

    const lastID = lasPelis.at(-1)?.id; 

    const newID = Date.now();

    const newFilmName= req.body.filmName;
    const newRotationType = req.body.rotationType;
    const newRegion = req.body.region;
    const newLengthMinutes = req.body.lengthMinutes;
    const newVideoFormat = req.body.lengthMinutes;

    const newLD: LD = {
        id: newID,
        filmName: req.body.filmName,
        rotationType: req.body.rotationType,
        region: req.body.region,
        lengthMinutes: req.body.lengthMinutes,
        videoFormat: req.body.videoFormat,
    }

    if(newFilmName && newRotationType && newRegion && newLengthMinutes && newVideoFormat && typeof(newFilmName=="string") && typeof(newRotationType== "`CAV` | `CLV`") && typeof(newRegion=="string") && typeof(newLengthMinutes=="number") && typeof(newVideoFormat=="`NTSC`  | `PAL`")){
        lasPelis.push(newLD);
        res.status(201).json(req.body);
    }else{
        res.status(404).send("Error al crear el nuevo LD")
    }

})

//borrar
app.delete("/lasPelis/:id", (req, res)=>{
    lasPelis = lasPelis.filter((elem) => elem.id !== Number (req.params.id));
    res.status(204).send("Esa peli ha sido: ELIMINADA")
})

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));

const testAPI = async()=>{

    //obtener todos las pelis de la lista
    const miPromesa = (await(axios.get<LD[]>("http://localhost:3000/lasPelis/"))).data;
    console.log(miPromesa);

    //creamos una nueva
    const misPelis : LD = {
        id: 3, 
        filmName: "SUPERMAN", 
        rotationType: `CLV`, 
        region: "Nebrija" ,
        lengthMinutes: 150,
        videoFormat: `NTSC`,
    }

    //añadimos
    axios.post(`http://localhost:3000/lasPelis/`, misPelis);

    //volver a comprobar que salen todas mas la nueva
    const miPromesa2 = (await(axios.get<LD[]>("http://localhost:3000/lasPelis/"))).data;
    console.log(miPromesa2);

    //comprobamos si tiene el mismo nombre
    const condicion = miPromesa2.find((elem)=>{
        if(elem.filmName === misPelis.filmName){
            return elem;
        }
    })

    //para identificar que es el mismo elemento por lo cual, borrarlo mediante su mismo id
    const miPromesa3 = (await (axios.delete<LD[]>(`http://localhost:3000/lasPelis/${condicion?.id}`))).data;
    console.log(miPromesa3);

    //mostramos la final una ultima vez
    const miPromesa4 = (await(axios.get<LD[]>("http://localhost:3000/lasPelis/"))).data;
    console.log(miPromesa4);
}

setTimeout((testAPI), 1000);