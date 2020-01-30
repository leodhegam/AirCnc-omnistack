import React ,{ useState, useMemo }from 'react';
import './styles.css';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
export default function New({history}) {

  const [company,setCompany] = useState('');

  const [techs,setTechs] = useState('');

  const [price,setPrice] = useState('');

  const [thumbnail,setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail):null;}, [thumbnail]
  )
  async function handleSubmit(e){
    e.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user');
    data.append('thumbnail',thumbnail);
    data.append('company',company);
    data.append('techs',techs);
    data.append('price',price);

     await api.post('/spots',data, {
      headers: { user_id }
    });
    history.pushState('/dashboard');
  }
  return (
   <form onSubmit={handleSubmit}>
     <label id="thumbnail " style={{backgroundImage: `url(${preview})`}} className={thumbnail ? 'has-thumbnail':''}>

       <input type="file" onChange={event => setThumbnail(event.target.files[0]) }/>
       <img src={camera} alt="Select img"/>
     </label>

     <label htmlFor="company">EMPRESA</label>
     <input
     id="company"
     placeholder="Sua empresa"
     value={company}
     onChange={event => setCompany(event.target.value)}/>

     <label htmlFor="company">TECNOLOGIAS * <span>(separadas por vírgulas)</span></label>
     <input
     id="techs"
     placeholder="Quais tecnologias usam?"
     value={techs}
     onChange={event => setTechs(event.target.value)}/><label htmlFor="company"></label>

     <label htmlFor="company">VALOR DA DIÁRIA * <span>(em branco para gratuito)</span></label>
     <input
     id="price"
     placeholder="Valor cobrado por dia"
     value={price}
     onChange={event => setPrice(event.target.value)}/><label htmlFor="company"></label>
     <button className="btn">CADASTRAR</button>
   </form>
  );
}
