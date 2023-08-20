import { GiMaze } from "react-icons/gi";

const Logo = () => {
    return ( 
        <section className="sidebar-title items-center p-4">
            <GiMaze size={30}/>
            <div className='flex flex-col p-4'>
                <div>Daedalus</div>
            </div>
        </section>
     );
}
 
export default Logo;