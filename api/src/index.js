import db from './db.js';
import express from 'express';
import cors from 'cors';
import Sequelize from 'sequelize';

const app = express();
app.use(cors());
app.use(express.json());


const { Op, col, fn } = Sequelize;






//Endpoints /login


 


app.post('/login', async (req, resp) => {
    try {
        let { email, senha } = req.body;
    
    let i = await db.infod_tif_usuario.findOne({
        where: {
            ds_email: email,
            ds_senha: senha
        },
        raw: true
  
    })

    if (i == null) {
        return resp.send({ erro: 'preenche direito abestalhado' });
    }
        resp.send(i);
        
    } catch (e) {
        resp.send({ erro : e.toString() })
    }
})













//Endpoints /usuario 












app.get('/usuario', async (req, resp) => {
try{
    
    let r = await db.infod_tif_usuario.findAll()

    resp.send(r)

} catch (e) {
    resp.send({ error: e.toString() })
}
})






app.post('/usuario', async (req, resp) => {
    try {
        let { nome, email, senha } = req.body;


    let h = await db.infod_tif_usuario.create({
        nm_usuario: nome,
        ds_email: email,
        ds_senha: senha
    })

    resp.send(h)
    } catch (e) {
        resp.send({error: e.toString()})
    }
})









app.put('/usuario/:id', async (req, resp) => {
    try {
        
        let idUsu = await db.infod_tif_usuario.findOne({where: {id_usuario: id}})

        let { nome, email, senha, telefone, perfil, biografia, fundo, genero } = req.body;

        let r = await db.infod_tif_usuario.update({
            nm_usuario: nome,
            ds_email: email,
            ds_senha: senha,
            ds_telefone: telefone,
            dt_criacao: new Date(),
            ds_perfil: perfil,
            ds_biografia: biografia,
            ds_fundo: fundo,
            ds_genero: genero
        })
        
        resp.send(r)

    } catch (e) {
        resp.send({ error: e.toString() })
    }
})





app.delete('/usuario/:id', async (req, resp) => {
    try {

        let r = await db.infod_tif_usuario.destroy({ where: {id_usuario: req.params.id } })

        resp.sendStatus(200)
        
    } catch (e) {
        resp.send({ error: e.toString() })
    }

})








//endpoints /catalogo









app.get('/catalogo', async (req, resp) => {
    try {
        
        let r = await db.infod_tif_animes.findAll()

        resp.send(r)

    } catch (e) {
        resp.send({ error: e.toString() })
    }
})


app.get('/catalogo/:id', async (req, resp) => {
    try {
        
        let r = await db.infod_tif_animes.findOne({where: {id_anime: req.params.id}})

        resp.send(r)

    } catch (e) {
        resp.send({ error: e.toString() })
    }
})


app.get('/catalogo/:anime', async (req, resp) => {
    try {
        
        let anime = await db.infod_tif_animes.findOne({ where: {nm_anime: req.params.anime } })

        let imagem = await db.infod_tif_animes.findOne({ where: {ds_imagem: anime.id_anime} })

        resp.send(imagem)
    } catch (e) {
        resp.send({error: e.toString()})
    }
})




app.post('/catalogo', async (req, resp) => {
    try {
        let { nome, classificacao, temporadas, genero, estrelando, sinopse, sobre, enredo, capa, ano, video1, video2, imagem } = req.body;

    let a = await db.infod_tif_animes.create({
        nm_anime: nome,
        ds_classificação: classificacao,
        ds_temporadas: temporadas,
        ds_genero: genero,
        ds_estrelando: estrelando,
        ds_sinopse: sinopse,
        ds_sobre: sobre,
        ds_enredo: enredo,
        ds_capa: capa,
        dt_postagem: new Date(),
        dt_ano: ano,
        ds_video1: video1,
        ds_video2: video2,
        ds_imagem: imagem
    })

    resp.send(a);

}   catch(b) {
        resp.send({erro: b.toString() })
    }
})






app.put('/catalogo/:id', async (req, resp) => {
    try {
        
        let { anime, classificacao, temporadas, genero, estrelando, sinopse, sobre, enredo, capa,  ano, video1, video2 } = req.body;

    let a = await db.infod_tif_animes.update({
        nm_anime: anime,
        ds_classificação: classificacao,
        ds_temporadas: temporadas,
        ds_genero: genero,
        ds_estrelando: estrelando,
        ds_sinopse: sinopse,
        ds_sobre: sobre,
        ds_enredo: enredo,
        ds_capa: capa,
        dt_ano: ano,
        ds_video1: video1,
        ds_video2: video2      
    },
    {
        where: { id_anime: req.params.id }
    })

    resp.send(a);

    } catch(b) {
        resp.send({erro: b.toString() })
    }
})






app.delete('/catalogo/:id', async (req, resp) => {
    try {
        
        let r = await db.infod_tif_animes.destroy({ where: {id_anime: req.params.id } });

        resp.sendStatus(200)

    } catch (e) {
        resp.send({ error: e.toString() })
    }
})





//endpoints /comentarios



app.get('/comentarios/:id', async (req, resp) => {
    try {
        
        let anime = await db.infod_tif_comentario.findOne({ where: { id_anime: req.params.id } })

        let comentarios = await db.infod_tif_comentario.findAll({where: {id_anime: anime}})
        
        resp.send(comentarios)

    } catch (e) {
        resp.send({error: e.toString()})
    }
})




app.get('/comentarios', async (req, resp) => {
    try {
        
      

        let comentarios = await db.infod_tif_comentario.findAll()
        
        resp.send(comentarios)

    } catch (e) {
        resp.send({error: e.toString()})
    }
})




app.post('/comentarios', async (req, resp) => {
    try {

        
        let {comentario, idzinho} = req.body;
        
        
        

        let r = {
         
            id_anime: idzinho,
            ds_comentario: comentario,
            dt_comentario: new Date()

        }

        let resultado = await db.infod_tif_comentario.create(r);
        resp.send(resultado);


    } catch (e) {
        resp.send({error: e.toString()})
    }
})




//endpoints / comunidade




app.get('/comunidade', async (req, resp) => {
    try {
        
        let comunidades = await db.infod_tif_comunidade.findAll()

        resp.send(comunidades)

    } catch (e) {
        resp.send({error: e.toString()})
    }
})




app.post('/comunidade', async (req, resp) => {
    try {

        let { capa, nome, id_usu, descricao } = req.body;

        let r = await db.infod_tif_comunidade.create(
            {
                ds_capa: capa,
                id_usuario: id_usu,
                nm_comunidade: nome,
                ds_descricao: descricao,
                dt_criacao: new Date()
            }
        )

        resp.send(r)

    } catch (e) {
        resp.send({error: e.toString()})
    }

})





//endpoints / chat




app.get('/chat/:id', async (req, resp) => {
    try {
        
        let comunidade = await db.infod_tif_chat.findOne({where: {id_comunidade: id}})
        let r = await db.infod_tif_chat.findAll();

        resp.send(r)

    } catch (e) {
        resp.send({error: e.toString()})
    }
})



app.post('/chat/:id', async (req, resp) => {
    try {
        let { comunidade, usuario, mensagem } = req.body;

        if (usuario == null)
            return resp.send({ erro: 'Usuario não logado' });
    
        if (comunidade == null)
            return resp.send({ erro: 'Sala não existe!' });
     
         if (!chat.mensagem || chat.mensagem.replace(/\n/g, '') == '')
            return resp.send({ erro: 'Mensagem é obrigatória!' });

        let r =  await db.infod_tif_chat.create(
            {
                id_comunidade: comunidade,
                id_usuario: usuario,
                ds_mensagem:  mensagem,
                dt_mensagem: new Date()
            }
        )
        resp.send(r)

    } catch (e) {
        resp.send({error: e.toString()})
    }
})





app.put('/chat/:id', async (req, resp) => {
    
    try {
        let id = req.params.id;
    let {mensagem } = req.body;
    

    let r = await db.infod_tif_chat.update({
        ds_mensagem:  mensagem
    },
    {where: {id_chat: id}}
    )
      resp.send(r)
        
    } catch (e) {
        resp.send({error: e.toString()})
    }
    
})



app.delete('/chat/:id', async (req, resp) => {
    try {
        
        let id = req.params.id;

        let r = await db.infod_tif_chat.destroy({ where: { id_chat: id } })
        
        resp.sendStatus(200)

    } catch (e) {
        resp.send({error: e.toString()})
    }
})






//Endpoints /favoritos 





app.get('/favorito', async (req, resp) => {
    try {
        let f = await db.infod_tif_favoritos.findAll({
            where: {id_usuario: Number(req.query.usuario)},
            atributes: [
                ['id_favorito', 'id_favorito'],
                [col('id_anime_infod_tif_animes.id_anime'), 'id'],
                [col('id_anime_infod_tif_animes.nm_anime'), 'anime'],
                [col('id_anime_infod_tif_animes.ds_classificação'), 'classificacao'],
                [col('id_anime_infod_tif_animes.ds_temporadas'), 'temporadas'],
                [col('id_anime_infod_tif_animes.ds_genero'), 'genero'],
                [col('id_anime_infod_tif_animes.ds_estrelando'), 'estrelando'],
                [col('id_anime_infod_tif_animes.ds_sinopse'), 'sinopse'],
                [col('id_anime_infod_tif_animes.ds_sobre'), 'sobre'],
                [col('id_anime_infod_tif_animes.ds_enredo'), 'enredo'],
                [col('id_anime_infod_tif_animes.de_capa'), 'capa'],
                [col('id_anime_infod_tif_animes.dt_ano'), 'ano'],
                [col('id_anime_infod_tif_animes.ds_video1'), 'video1'],
                [col('id_anime_infod_tif_animes.ds_video2'), 'video2'],
                [col('id_anime_infod_tif_animes.ds_imagem'), 'imagem']
            ],
            order: [
                ['id_favorito', 'desc']
            ],
            include: [
                {
                    model: db.infod_tif_animes,
                    as: 'id_anime_infod_tif_animes',
                    required: true
                }
            ]
        });

        resp.send(f);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})






app.post('/favorito', async (req, resp) => {
    try {
        
        let { usu, anime } = req.body;

        let f = await db.infod_tif_favoritos.create(
            {
                id_usuario: usu,
                id_anime: anime
            }
        )
        resp.send(f)

    } catch (f) {
        resp.send({ erro: f.toString() })
    }
})





app.put('/favorito/:id', async (req, resp) => {
    try {
        let { usu, anime } = req.body;
        let{ id } = req.params;

        let i = await db.infod_tif_favoritos.update(
            {
                id_usuario: usu,
                id_anime: anime
            },
            {
                where: { id_favorito: id }
            }
        )
        
        resp.sendStatus(200);
    } catch (i) {
        resp.send({ erro: b.toString() })
    }
} )






app.delete('/:id' , async ( req, resp ) => {
    try {
        let { id } = req.params;
        let r = await db.infod_tif_favoritos.destroy({ where: { id_favorito: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})





app.listen(process.env.PORT,
    x => console.log(`>> Subiu esse caralho na porta ${process.env.PORT}`))
