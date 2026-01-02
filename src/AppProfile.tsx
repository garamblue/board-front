import './App.css';
import Profile from './components/Profile';
import Avatar from './components/Avatar';

function AppProfile() {
    return <>
        <Avatar imgUrl='https://picsum.photos/194/196' isNew={true}/>
        <Profile
            imgUrl='https://picsum.photos/198/196'
            name='John Kim'
            job='Frontend Developer'
            isNew={true}
        />
        <Profile 
            imgUrl='https://picsum.photos/196/196'
            name='David Hoper'
            job='Backend Developer'
        />
        <Profile 
            imgUrl='https://picsum.photos/196/198'
            name='James Hoffmann'
            job='Project Manager'
        />
    </>;
}

export default AppProfile;