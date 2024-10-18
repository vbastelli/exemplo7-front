import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../css/estilo.css'


const Produto = () => {

  //Hook- useParams- criar e manipular o id
  let {id} = useParams();

  //Hook-useNavigate - redireciona para outro componente
  const navigate =useNavigate();

  //Hook- useState- manipula o estado da varivel
  const [produto,setProduto]=useState({
    id,
    nome:"",
    imagem:""
  })
  //criando a função handleChange( pega os valores que passar no input)
  // ... spreed
  const handleChange=(e)=>{
    setProduto({...produto,[e.target.name]:e.target.value});
  }

  const handleSubmit=(e)=>{
    //previne qualquer alterção no formulario ex. load
    e.preventDefault();
    fetch(`http://localhost:5000/produto/${id ? id : '' }`,{
      method:"post",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(produto)
    }).then(()=>{
      navigate("/");
    })
  }

  useEffect(()=>{
    if(id){
      fetch(`http://localhost:5000/produto/${id}`)
      .then((resp)=>{
        return resp.json()
      })
      .then((data)=>{
        setProduto(data)
      })
    }
  },[])







  return (
    <section className='produto'>
      <h1>Cadastrar Produto</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor='nome'>Nome do Produto</label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={produto.nome}
            onChange={handleChange}
            />
        </p>

        <p>
          <label htmlFor='imagem'>Imagem do Produto</label>
          <input
            type="url"
            name="imagem"
            id="imagem"
            value={produto.imagem}
            onChange={handleChange}
          />
        </p>
        <button type="submit">Cadastrar</button>

      </form>
      
      </section>
  )
}

export default Produto