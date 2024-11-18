import React, { useState } from 'react';
import BlastTexto from '../../images/BlastTexto.png';
import Dinheiro from '../../images/Dinheiro.png';
import WppButton from '../wpp/WppButton';
import { Button, TextField, Dialog, DialogContent, Box, InputAdornment, Typography } from '@mui/material';
import PanToolAlt from '@mui/icons-material/PanToolAlt';
import './FormOvertime.css';

const FormOvertime = () => {
  const [salarioBase, setSalarioBase] = useState('R$ 0,00');
  const [valorSalarioBase, setValorSalarioBase] = useState(0);
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [percentualHoraExtra, setPercentualHoraExtra] = useState('');
  const [quantidadeHorasExtras, setQuantidadeHorasExtras] = useState('');
  const [resultado, setResultado] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCalcular = () => {
    const salarioBaseNum = parseFloat(valorSalarioBase)/100;
    const cargaHorariaNum = parseFloat(cargaHoraria);
    const percentualHoraExtraNum = parseFloat(percentualHoraExtra) / 100;
    const quantidadeHorasExtrasNum = parseFloat(quantidadeHorasExtras);
    
    console.log("salarioBaseNum", salarioBaseNum);
    console.log("cargaHorariaNum", cargaHorariaNum);
    console.log("percentualHoraExtraNum", percentualHoraExtraNum);
    console.log("quantidadeHorasExtrasNum", quantidadeHorasExtrasNum);

    if (isNaN(salarioBaseNum) || isNaN(cargaHorariaNum) || isNaN(percentualHoraExtraNum) || isNaN(quantidadeHorasExtrasNum)) {
      // alert('Por favor, preencha todos os campos corretamente.');
      return;
    }
    
    const valorHora = salarioBaseNum / cargaHorariaNum;
    const valorHoraExtra = valorHora * (1 + percentualHoraExtraNum);
    const totalHorasExtras = valorHoraExtra * quantidadeHorasExtrasNum;
    
    setResultado(totalHorasExtras.toFixed(2));
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false); 
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;

    let numericValue = inputValue.replace(/\D/g, '');

    if (!numericValue) {
      numericValue = '0';
    }
    
    setValorSalarioBase(numericValue);

    const formattedValue = `R$ ${(numericValue / 100).toFixed(2).replace('.', ',')}`;
    setSalarioBase(formattedValue);
  };

  return (
    <div>
      <header className="header">
        <img src={BlastTexto} alt="Blast Texto" className="logo" />
        <p style={{fontSize: '30px', fontWeight: 'bold'}}>
          Calcule suas horas extras grátis</p>
        <p style={{fontSize: '20px', fontWeight: 'bold'}}>
          Calcule o valor das horas extras devidas com base no salário bruto do seu cliente empregado
          e estime a quantidade de horas extras trabalhadas que não foram remuneradas.
        </p>
        <div className="hand">
          <PanToolAlt style={{ fontSize: 50, color: 'white', transform: 'rotate(180deg)'}} />
        </div>
      </header>

      <Box>
        <div className="form-container">
          <TextField
            id="salario-base"
            label="Salário Base*"
            value={salarioBase}
            // onChange={(e) => setSalarioBase(e.target.value)}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Typography style={{color:"#545454", fontSize:14}} variant='subtitle1'>Salário base é aquele registrado na CTPS, sem considerar os descontos legais (INSS e IR).</Typography>
          <TextField
            id="carga-horaria"
            label="Carga Horária Mensal*"
            type="number"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: <InputAdornment position="end">horas</InputAdornment>,
            }}
          />
          <Typography style={{color:"#545454", fontSize:14}} variant='subtitle1'>Informar a carga horária mensal de trabalho (se você não souber, basta multiplicar a quantidade de horas trabalhadas na semana por 5. Ex: 44h semanais equivalem a 220h mensais).</Typography>
          <TextField
            id="percentual-hora-extra"
            label="Percentual da Hora Extra (%)*"
            type="number"
            value={percentualHoraExtra}
            onChange={(e) => setPercentualHoraExtra(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
          <Typography style={{color:"#545454", fontSize:14}} variant='subtitle1'>Informar o % de Hora Extra que você quer calcular. Em dias normais o % mínimo é 50% e em Domingos e Feriados, 100%.</Typography>
          <TextField
            id="quantidade-horas-extras"
            label="Quantidade de Horas Extras*"
            type="number"
            value={quantidadeHorasExtras}
            onChange={(e) => {
              const value = e.target.value;
              if (value > 0 || value === "") {
                setQuantidadeHorasExtras(value);
              }
            }}
            fullWidth
            margin="normal"
            error={quantidadeHorasExtras <= 0 && quantidadeHorasExtras !== ""}
            helperText={
              quantidadeHorasExtras <= 0 && quantidadeHorasExtras !== "" 
                ? "O valor deve ser maior que zero"
                : ""
            }
          />
          <Typography style={{color:"#545454", fontSize:14}} variant='subtitle1'>Informar a quantidade de Hora Extra que você quer calcular no formato hh:mm (horas:minutos).</Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: '#f57c00', color: '#FFFFFF', marginTop:15}}
            onClick={handleCalcular}>
            Calcular
          </Button>

          <Dialog open={modalOpen} onClose={handleClose}>
            <DialogContent style={{ backgroundColor: '#ff6f00', color: '#ffffff', textAlign: 'center' }}>
              <p style={{fontSize: '16px'}}>
                Sabia que além das horas extras são devidos os reflexos em descanso semanal remunerado e feriados, aviso prévio, férias acrescidas de 1/3, 13º salários, FGTS + 40% e Participação nos Lucros e Resultados da empresa?
              </p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFFF00', textShadow: '1px 1px 2px black' }}>
                O valor apenas de horas extras é:
              </p>
              <p style={{ color: '#FFFF00', fontSize: '30px', fontWeight: 'bold', textShadow: '1px 1px 2px black' }}>
                R$ {resultado}
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </Box>
      
      <div className='also-text'>
        <p style={{ fontSize: '20px'}}>
          Também fornecemos o cálculo completo e preciso para seu processo trabalhista.
        </p>
        <p style={{ fontSize: '20px'}}>
          Escritórios de advocacia experientes já usam nossos cálculos com muito sucesso.
        </p>
      </div>
      
      <div className='image-money'>
        <img src={Dinheiro} alt="Descrição da Imagem" className="img-class"/>
      </div>

      <div className='header'>
        <p style={{ fontSize: '20px', fontWeight: 'bold', textShadow: '1px 1px 2px black' }}>
          Além das verbas rescisorias voce pode usar nosso calculo completo no pedido de danos morais.
        </p>
      </div>

      <WppButton></WppButton>
      
      <footer className="footer">
        <img src={BlastTexto} alt="Blast Texto" className="logo" />
        <p>
          <b>Contabilidade Digital e Calculos Periciais Contabeis e Trabalhistas</b>
        </p>
        <p>
          <b>Av. Presidente Vargas, 197, Campina, Belem/PA</b>
        </p>
      </footer>
    </div>
  );
};

export default FormOvertime;
