import Logo from '/logo.png'
import './style.css'
export default function index() {
  return (
    <div className='start-0 bottom-0' style={{ width: "100%" }}>
      <hr style={{ border: "2px solid black" }} />
      <div className="d-flex justify-content-between">
        <img className='ms-3' src={Logo} alt="image"  style={{width:"10%",height:"10%"}}/>
        <div className=" d-flex justify-content-end me-5">
          <div className="mx-4">
            <ul >
              <li className='my-5' style={{color:'#646464'}}>Company</li>
              <li className='pb-4'>Features</li>
              <li className='pb-4'>Pricing</li>
              <li className='pb-4'>Affiliate Program</li>
              <li className='pb-4'>Press Kit</li>
            </ul>
          </div>
          <div className='mx-4'>
            <ul >
            <li className='my-5' style={{color:'#646464'}}>Support</li>
              <li className='pb-4'>Account</li>
              <li className='pb-4'>Help</li>
              <li className='pb-4'>Contact Us</li>
              <li className='pb-4'>Customer Support</li>
            </ul>
          </div>
          <div className='mx-4'>
            <ul >
            <li className='my-5' style={{color:'#646464'}}>Legals</li>
              <li className='pb-4'>Terms & Conditions</li>
              <li className='pb-4'>Privacy Policy</li>
              <li className='pb-4'>Licensing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
