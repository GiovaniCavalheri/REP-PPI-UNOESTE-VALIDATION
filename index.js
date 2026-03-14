import express from "express";

const server = express();
const PORT = 3000;

server.use(express.urlencoded({ extended: true }));
server.use(express.static("publico"));

const empresas = [];

// ==> get para login
server.get("/login", (req, res) => {
  const html = `
  <html>
  <head>
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>

  <body class="bg-dark">

  <div class="container py-5">
    <div class="card">
      <div class="card-body">

        <h2>Login</h2>

        <form method="POST" action="/login">

          <div class="mb-3">
            <label>Usuário</label>
            <input type="text" name="usuario" class="form-control">
          </div>

          <div class="mb-3">
            <label>Senha</label>
            <input type="password" name="senha" class="form-control">
          </div>

          <button class="btn btn-primary">Entrar</button>

        </form>

      </div>
    </div>
  </div>

  </body>
  </html>
  `;

  res.send(html);
});


server.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === "adm" && senha === "123") {
    res.send(
      `<script>alert("Login realizado com sucesso"); window.location="/";</script>`,
    );
  } else {
    res.send(
      `<script>alert("Usuário ou senha invalido"); window.location="/login";</script>`,
    );
  }
});

// ==> sair
server.get("/logout", (req, res) => {
  res.send(
    `<script>alert("Logout efetuado com sucesso"); window.location="/";</script>`,
  );
});


// ROTA GET
server.get("/", (req, res) => {
  let lista = "";

  for (let empresa of empresas) {
    lista += `<li> ${empresa.cnpj} - ${empresa.razao} - ${empresa.fantasia} - ${empresa.cidade}</li>`;
  }

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

<nav class="navbar navbar-expand-lg navbar-dark bg-secondary mb-4">
  <div class="container">
    <a class="navbar-brand" href="/">Sistema de cadastro</a>

    <div class="navbar-nav">
      <a class="nav-link" href="/">Home</a>
      <a class="nav-link" href="/login">Login</a>
      <a class="nav-link" href="/logout">Logout</a>
    </div>
  </div>
</nav>

      <div class="container py-5">
          <div class="row justify-content-center">
              <div class="col-md-8">

                  <div class="card shadow-sm">
                      <div class="card-body">

                          <h1 class="mb-4 text-center">Cadastro de Fornecedor</h1>

                          <form method="POST" action="/submit">

                              <h5 class="mt-3">Dados para Cadastro</h5>

                              <div class="my-4">
                                  <label class="form-label fw-bold">CNPJ</label>
                                  <input type="text" name="cnpj" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">Razão Social</label>
                                  <input type="text" name="razao" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">Fantasia</label>
                                  <input type="text" name="fantasia" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">Endereço</label>
                                  <input type="text" name="Endereco" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">Cidade</label>
                                  <input type="text" name="cidade" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">UF</label>
                                  <input type="text" name="UF" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">CEP</label>
                                  <input type="text" name="CEP" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">EMAIL</label>
                                  <input type="email" name="EMAIL" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">Telefone</label>
                                  <input type="tel" name="phone" class="form-control">
                              </div>

                              <button type="submit" class="btn btn-primary w-100">
                                  Cadastrar
                              </button>

                          </form>

                            <hr>
                        <h4>Empresas cadastradas</h4>
                          <ul>
                            ${lista}
                          </ul>
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

server.post("/submit", (req, res) => {
  const { cnpj, razao, fantasia, Endereco, cidade, UF, CEP, EMAIL, phone } =
    req.body;

  // ==> Todos os campos são obrigatórios
  if (
    !cnpj ||
    !razao ||
    !fantasia ||
    !Endereco ||
    !cidade ||
    !UF ||
    !CEP ||
    !EMAIL ||
    !phone
  ) {
    res.send('<script>alert("Campos obrigatórios não preenchidos!");</script>');
  }

  const campos = [
    "cnpj",
    "razao",
    "fantasia",
    "Endereco",
    "cidade",
    "UF",
    "CEP",
  ];
  // ==> validando 1 a 1
  const campoVazio = campos.find((campo) => !req.body[campo]);

  if (campoVazio) {
    return res.send(
      `<script>alert('O campo ${campoVazio} não foi preenchido!')</script>`,
    );
  }

  const empresa = {
    cnpj: req.body.cnpj,
    razao: req.body.razao,
    fantasia: req.body.fantasia,
    Endereco: req.body.Endereco,
    cidade: req.body.cidade,
    UF: req.body.UF,
    CEP: req.body.CEP,
    EMAIL: req.body.EMAIL,
    phone: req.body.phone,
  };

  empresas.push(empresa);

  let lista = "";

  for (let empresa of empresas) {
    lista += `<li>${empresa.cnpj} - ${empresa.razao} - ${empresa.fantasia} - ${empresa.cidade}</li>`;
  }

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
<nav class="navbar navbar-expand-lg navbar-dark bg-secondary mb-4">
    <div class="container">
        <a class="navbar-brand" href="/">Sistema de cadastro</a>

        <div class="navbar-nav">
            <a class="nav-link" href="/">Home</a>
            <a class="nav-link" href="/login">Login</a>
            <a class="nav-link" href="/logout">Logout</a>
        </div>
    </div>
</nav>

      <div class="container py-5">
          <div class="row justify-content-center">
              <div class="col-md-8">

                  <div class="card shadow-sm">
                      <div class="card-body">

                          <h1 class="mb-4 text-center">Cadastro de Fornecedor</h1>

                          <form method="POST" action="/submit">

                              <h5 class="mt-3">Dados para Cadastro</h5>

                              <div class="my-4">
                                  <label class="form-label fw-bold">CNPJ</label>
                                  <input type="text" name="cnpj" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">Razão Social</label>
                                  <input type="text" name="razao" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">Fantasia</label>
                                  <input type="text" name="fantasia" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">Endereço</label>
                                  <input type="text" name="Endereco" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">Cidade</label>
                                  <input type="text" name="cidade" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">UF</label>
                                  <input type="text" name="UF" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">CEP</label>
                                  <input type="text" name="CEP" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">EMAIL</label>
                                  <input type="email" name="EMAIL" class="form-control">
                              </div>

                              <div class="mb-3">
                                  <label class="form-label fw-bold">Telefone</label>
                                  <input type="tel" name="phone" class="form-control">
                              </div>

                              <button type="submit" class="btn btn-primary w-100">
                                  Cadastrar
                              </button>

                          </form>

                            <hr>
                        <h4>Empresas cadastradas</h4>
                          <ul>
                            ${lista}
                          </ul>
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
