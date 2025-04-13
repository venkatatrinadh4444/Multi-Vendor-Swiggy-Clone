import welcomeImg from '../../assets/welcome.jpg'
import { useContextData } from '../../context/ContextData'

const Welcome=()=> {
    const {userData}=useContextData()
    return (
        <>
        <div className='col-sm-8 m-auto text-center'>
            <h3 className='mt-2 text-primary'>Welcome {userData?.username?`${userData.username}`:"please login"}</h3>
        <img src={welcomeImg} alt="welcome" width="300px" className='mt-2'/>
        </div>
        </>
    )
}

export default Welcome