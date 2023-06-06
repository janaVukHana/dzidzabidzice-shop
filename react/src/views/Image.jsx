import './Image.css'
import Divider from '@mui/material/Divider';
import AddNewImageForm from '../components/AddNewImageForm'

export default function Image() {

    return (
        <div className='Image section'>
            <h1>
                <Divider component="div" role="presentation">Sličice</Divider>
            </h1>
            <AddNewImageForm />
            {/* tabela sa slicicama i delete i edit i cols i rows as optional */}
        </div>
    )
}