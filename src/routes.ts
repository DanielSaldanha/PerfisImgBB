import { Router, Request, Response } from 'express';
import pool from './db';
import { Perfil } from './types';
import { RowDataPacket } from 'mysql2';
import { getImageUrl } from './config';

const router = Router();

router.get('/perfil/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID deve ser um número inteiro' });
            return;
        }

        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM perfil WHERE id = ?', [id]);

        if (rows.length === 0) {
            res.status(404).json({ error: 'Perfil não encontrado' });
            return;
        }

        let perfil = rows[0] as Perfil;
        
        // Construir URL completa da imagem
        perfil.caminhoImagem = getImageUrl(perfil.caminhoImagem);
        
        res.json(perfil);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default router;
