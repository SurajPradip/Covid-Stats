import Main from "./Componants/Main";
import { useEffect , useState } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'jquery/dist/jquery.min.js'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-dt/js/dataTables.dataTables'
import $ from "jquery";

function App() {

  const [covidData,setCovidData] = useState([])

  useEffect(() =>{
    axios.get('https://api.covid19api.com/summary').then(res =>{
      setCovidData(res.data.Countries)
    }).catch(err => console.log(err))

    $(document).ready(()=>{
      $('#tablemine').DataTable()
    })

  },[covidData])

  function Table() {

  
    return (
        <div className>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <table id="tablemine" className='table table-dark table-bordered'>
                        <thead>
                            <tr style={{color : 'yellow'}}>
                                <th>Country</th>
                                <th>Cofirmed</th>
                                <th>Active Cases</th>
                                <th>Cured</th>
                                <th>Deaths</th>
                            </tr>
                        </thead>

                        <tbody>
                          {tableData}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
 
  const tableData = covidData.map(obj =>{
     return(  <tr>
        <td>{obj.Country}</td>
        <td>{obj.TotalConfirmed}</td>
        <td>{obj.TotalConfirmed-obj.TotalRecovered}</td>
        <td>{obj.TotalRecovered}</td>
        <td>{obj.TotalDeaths}</td>
      </tr>)
  })



  return (
    <div >
      <header>
        <div className='overlay'>
        <Main />
        </div>
        
      </header>
      <div className='bg'>
       {Table()}
      </div>
     
    </div>
  );
}

export default App;
