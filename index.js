import exprees from "express";

const server = exprees();
const PORT = 3000;

server.use(exprees.urlencoded({ extended: true }));
server.use(exprees.static("publico"));

// ROTA GET
server.get("/", (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <title>Planejamento de Carreira Dev</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>

  <body class="bg-dark">

  <div class="container py-5">
      <div class="row justify-content-center">
          <div class="col-md-8">

              <div class="card shadow-sm">
                  <div class="card-body">

                      <h1 class="mb-4 text-center">Cadastro de Fornecedor</h1>

                      <form method="POST" action="/submit">

                          <h5 class="mt-3">Dados Básicos</h5>

                          <div class="mb-3">
                              <label class="form-label">Nome</label>
                              <input type="text" name="nome" class="form-control" required>
                          </div>

                          <div class="mb-3">
                              <label class="form-label">Nível Atual</label>
                              <select name="nivel" class="form-select" required>
                                  <option value="">Selecione</option>
                                  <option value="iniciante">Iniciante</option>
                                  <option value="intermediario">Intermediário</option>
                                  <option value="avancado">Avançado</option>
                              </select>
                          </div>

                          <h5 class="mt-4">Stack Atual</h5>

                          <div class="mb-3">
                              <div class="form-check">
                                  <input class="form-check-input" type="checkbox" name="stack[]" value="HTML">
                                  <label class="form-check-label">HTML</label>
                              </div>

                              <div class="form-check">
                                  <input class="form-check-input" type="checkbox" name="stack[]" value="CSS">
                                  <label class="form-check-label">CSS</label>
                              </div>

                              <div class="form-check">
                                  <input class="form-check-input" type="checkbox" name="stack[]" value="JavaScript">
                                  <label class="form-check-label">JavaScript</label>
                              </div>

                              <div class="form-check">
                                  <input class="form-check-input" type="checkbox" name="stack[]" value="Node.js">
                                  <label class="form-check-label">Node.js</label>
                              </div>
                          </div>

                          <h5 class="mt-4">Objetivo</h5>

                          <div class="mb-3">
                              <select name="objetivo" class="form-select" required>
                                  <option value="">Selecione</option>
                                  <option value="frontend">Frontend</option>
                                  <option value="backend">Backend</option>
                                  <option value="fullstack">Fullstack</option>
                              </select>
                          </div>

                          <h5 class="mt-4">Disponibilidade</h5>

                          <div class="mb-3">
                              <input type="number" name="horas" class="form-control" placeholder="Horas por semana" required>
                          </div>

                          <h5 class="mt-4">Mercado</h5>

                          <div class="mb-3">
                              <div class="form-check">
                                  <input class="form-check-input" type="radio" name="mercado" value="CLT" required>
                                  <label class="form-check-label">CLT</label>
                              </div>

                              <div class="form-check">
                                  <input class="form-check-input" type="radio" name="mercado" value="Freelancer">
                                  <label class="form-check-label">Freelancer</label>
                              </div>

                              <div class="form-check">
                                  <input class="form-check-input" type="radio" name="mercado" value="Exterior">
                                  <label class="form-check-label">Exterior</label>
                              </div>
                          </div>

                          <div class="d-grid">
                              <button type="submit" class="btn btn-primary">
                                  Gerar Roadmap
                              </button>
                          </div>

                      </form>
                  </div>
              </div>

          </div>
      </div>
  </div>

  </body>
  </html>
  `;

  res.send(html);
});


server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});