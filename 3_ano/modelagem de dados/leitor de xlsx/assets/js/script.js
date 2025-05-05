function processarArquivo() {
    const fileInput = document.getElementById('arquivo');
    const file = fileInput.files[0];
    const debug = document.getElementById('debug');
    
    if (!file) {
        alert('Por favor, selecione um arquivo.');
        return;
    }

    debug.style.display = 'block';
    debug.innerHTML = 'Processando arquivo...';

    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            debug.innerHTML += '<br>Arquivo carregado com sucesso';
            
            const data = new Uint8Array(e.target.result);
            debug.innerHTML += '<br>Dados convertidos para Uint8Array';
            
            const workbook = XLSX.read(data, { type: 'array' });
            debug.innerHTML += '<br>Workbook criado';
            
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            debug.innerHTML += '<br>Primeira planilha selecionada';
            
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            debug.innerHTML += '<br>Dados convertidos para JSON';
            
            // Remover cabeçalho
            jsonData.shift();
            debug.innerHTML += '<br>Cabeçalho removido';
            
            // Processar dados
            const alunos = jsonData.map(row => ({
                nome: row[0] || '',
                escola: row[1] || '',
                curso: row[2] || '',
                serie: row[3] || '',
                data_nascimento: row[4] || ''
            }));

            debug.innerHTML += '<br>Dados processados: ' + alunos.length + ' alunos encontrados';
            
            // Gerar resultados
            gerarResultados(alunos);
            debug.innerHTML += '<br>Resultados gerados com sucesso';
            
        } catch (error) {
            debug.innerHTML += '<br>Erro: ' + error.message;
            alert('Erro ao processar o arquivo: ' + error.message);
        }
    };

    reader.onerror = function(error) {
        debug.innerHTML += '<br>Erro ao ler o arquivo: ' + error.message;
        alert('Erro ao ler o arquivo: ' + error.message);
    };

    reader.readAsArrayBuffer(file);
}

function gerarResultados(alunos) {
    // Limpar seções
    document.getElementById('filtro-qtde-escola').innerHTML = '';
    document.getElementById('filtro-escola-curso').innerHTML = '';
    document.getElementById('filtro-escola-serie').innerHTML = '';
    document.getElementById('filtro-ordem-alfabetica').innerHTML = '';
    document.getElementById('filtro-mes-nascimento').innerHTML = '';

    if (alunos.length === 0) {
        document.getElementById('filtro-qtde-escola').innerHTML = '<div class="alert alert-warning">Nenhum dado encontrado no arquivo.</div>';
        return;
    }

    // 1.1) Qtde de Alunos por escola
    const alunosPorEscola = {};
    alunos.forEach(aluno => {
        if (aluno.escola) {
            alunosPorEscola[aluno.escola] = (alunosPorEscola[aluno.escola] || 0) + 1;
        }
    });

    // 1.2) Alunos por escola e qtde por curso
    const alunosPorEscolaCurso = {};
    alunos.forEach(aluno => {
        if (aluno.escola && aluno.curso) {
            if (!alunosPorEscolaCurso[aluno.escola]) {
                alunosPorEscolaCurso[aluno.escola] = {};
            }
            alunosPorEscolaCurso[aluno.escola][aluno.curso] = (alunosPorEscolaCurso[aluno.escola][aluno.curso] || 0) + 1;
        }
    });

    // 1.3) Qtde de alunos por escola e por série
    const alunosPorEscolaSerie = {};
    alunos.forEach(aluno => {
        if (aluno.escola && aluno.serie) {
            if (!alunosPorEscolaSerie[aluno.escola]) {
                alunosPorEscolaSerie[aluno.escola] = {};
            }
            alunosPorEscolaSerie[aluno.escola][aluno.serie] = (alunosPorEscolaSerie[aluno.escola][aluno.serie] || 0) + 1;
        }
    });

    // 2.1) Ordenar por nome
    const alunosOrdenadosNome = [...alunos].sort((a, b) => {
        const nomeA = String(a.nome || '').toLowerCase();
        const nomeB = String(b.nome || '').toLowerCase();
        return nomeA.localeCompare(nomeB);
    });

    // 2.2) Ordenar por mês de nascimento
    const alunosOrdenadosMes = [...alunos].sort((a, b) => {
        try {
            const dataA = new Date(a.data_nascimento || '');
            const dataB = new Date(b.data_nascimento || '');
            
            // Se alguma data for inválida, coloca no final
            if (isNaN(dataA.getTime())) return 1;
            if (isNaN(dataB.getTime())) return -1;
            
            const mesA = dataA.getMonth();
            const mesB = dataB.getMonth();
            return mesA - mesB;
        } catch (error) {
            console.error('Erro ao ordenar por data:', error);
            return 0;
        }
    });

    // Preencher seções de filtros/resumos
    document.getElementById('filtro-qtde-escola').innerHTML = gerarTabelaAlunosPorEscola(alunosPorEscola, alunos);
    document.getElementById('filtro-escola-curso').innerHTML = gerarTabelaAlunosPorEscolaCurso(alunosPorEscolaCurso);
    document.getElementById('filtro-escola-serie').innerHTML = gerarTabelaAlunosPorEscolaSerie(alunosPorEscolaSerie);

    // Preencher seções de filtro de alunos
    document.getElementById('filtro-ordem-alfabetica').innerHTML = gerarTabelaAlunosOrdenadosNome(alunosOrdenadosNome);
    document.getElementById('filtro-mes-nascimento').innerHTML = gerarTabelaAlunosOrdenadosMes(alunosOrdenadosMes);
}

function gerarTabelaAlunosPorEscola(dados, alunos) {
    let html = '<h5 class="card-title">Quantidade de Alunos por Escola</h5>';
    for (const escola of Object.keys(dados).sort()) {
        // Filtra alunos da escola
        const alunosDaEscola = alunos.filter(a => a.escola === escola && a.nome);
        if (alunosDaEscola.length === 0) continue;
        html += `
        <div class="card mb-3">
            <div class="card-body">
                <h6>${escola}</h6>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nome do Aluno</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        alunosDaEscola.forEach(aluno => {
            html += `<tr><td>${aluno.nome}</td></tr>`;
        });
        html += `
                    </tbody>
                </table>
                <div><strong>Total de alunos:</strong> ${alunosDaEscola.length}</div>
            </div>
        </div>
        `;
    }
    return html;
}

function gerarTabelaAlunosPorEscolaCurso(dados) {
    let html = '<h5 class="card-title">Alunos por Escola e Curso</h5>';
    for (const escola of Object.keys(dados).sort()) {
        html += `
        <div class="card mb-3">
            <div class="card-body">
                <h6>${escola}</h6>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Curso</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        for (const [curso, quantidade] of Object.entries(dados[escola])) {
            html += `<tr><td>${curso}</td><td>${quantidade}</td></tr>`;
        }
        html += `
                    </tbody>
                </table>
            </div>
        </div>
        `;
    }
    return html;
}

function gerarTabelaAlunosPorEscolaSerie(dados) {
    let html = '<h5 class="card-title">Alunos por Escola e Série</h5>';
    for (const escola of Object.keys(dados).sort()) {
        html += `
        <div class="card mb-3">
            <div class="card-body">
                <h6>${escola}</h6>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Série</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        for (const [serie, quantidade] of Object.entries(dados[escola])) {
            html += `<tr><td>${serie}</td><td>${quantidade}</td></tr>`;
        }
        html += `
                    </tbody>
                </table>
            </div>
        </div>
        `;
    }
    return html;
}

function gerarTabelaAlunosOrdenadosNome(alunos) {
    let html = `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">Alunos Ordenados por Nome</h5>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Escola</th>
                            <th>Curso</th>
                            <th>Série</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    alunos.forEach(aluno => {
        html += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.escola}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.serie}</td>
            </tr>
        `;
    });

    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;

    return html;
}

function gerarTabelaAlunosOrdenadosMes(alunos) {
    let html = `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">Alunos Ordenados por Mês de Nascimento</h5>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Mês</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    alunos.forEach(aluno => {
        const data = new Date(aluno.data_nascimento);
        const mes = data.getMonth() + 1;
        html += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.data_nascimento}</td>
                <td>${mes}</td>
            </tr>
        `;
    });

    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;

    return html;
} 