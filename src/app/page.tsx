import InviteToServer from '@/components/InviteToServer';
import Nav from '@/components/Nav';
import Navbar from '@/components/Navbar';
import ZPattern from '@/components/ZPattern';
import Footer from '@/components/Footer';

const Home = () => {
	return (
		<main>
			<div>
				<div className='px-4 mx-auto max-w-7xl'>
					<div className='flex flex-col my-20 gap-y-40'>
						{/* Hero Section */}
						<ZPattern
							imageProps={{
								src: '/bot-icon.png',
								height: 283,
								width: 283,
								className: 'order-1 md:order-2 md:ml-auto',
								alt: 'Icon',
							}}
						>
							<div className='flex flex-col gap-y-8 mt-8 md:mt-0 order-2 md:order-1 '>
								<h1 className='font-black text-3xl md:text-7xl md:max-w-xl'>
									Cardinal Bot
								</h1>

								<h2 className='font-semibold text-lg md:text-2xl md:max-w-md'>
									Add what the bot does in here after youre done making the damn
									bot
								</h2>

								<InviteToServer />
							</div>
						</ZPattern>

						{/* ZPattern 1 */}
						<ZPattern
							imageProps={{
								src: '/bot-icon.png',
								height: 222,
								width: 222,
								className: 'md:ml-auto',
								alt: 'Icon',
							}}
						>
							<div className='flex flex-col gap-y-8 mb-8'>
								<h2 className='font-black text-2xl md:text-4xl'>
									Insert Benefit Here
								</h2>
								<p className='text-sm md:text-xl font-semibold leading-8 md:max-w-md'>
									lorem impsum soiha fodi dsfoimfjs fidfjs fsdiofmjsof sofijsdmf
									dfisdojmfsdofi sdoifmjdisfoj fsoidfmjdfij fsdoifmsfij
									dfdosifmj
								</p>
							</div>
						</ZPattern>

						{/* ZPattern 2 */}
						<ZPattern
							imageProps={{
								src: '/bot-icon.png',
								height: 222,
								width: 222,
								className: 'md:order-1',
								alt: 'Icon',
							}}
						>
							<div className='flex flex-col gap-y-8 mb-8 md:order-2 md:ml-auto'>
								<h2 className='font-black text-2xl md:text-4xl'>
									Insert Benefit Here
								</h2>
								<p className='text-sm md:text-xl font-semibold leading-8 md:max-w-md'>
									lorem impsum soiha fodi dsfoimfjs fidfjs fsdiofmjsof sofijsdmf
									dfisdojmfsdofi sdoifmjdisfoj fsoidfmjdfij fsdoifmsfij
									dfdosifmj
								</p>
							</div>
						</ZPattern>

						{/* ZPattern 3 */}
						<ZPattern
							imageProps={{
								src: '/bot-icon.png',
								height: 222,
								width: 222,
								className: 'md:ml-auto',
								alt: 'Icon',
							}}
						>
							<div className='flex flex-col gap-y-8 mb-8'>
								<h2 className='font-black text-2xl md:text-4xl'>
									Insert Benefit Here
								</h2>
								<p className='text-sm md:text-xl font-semibold leading-8 md:max-w-md'>
									lorem impsum soiha fodi dsfoimfjs fidfjs fsdiofmjsof sofijsdmf
									dfisdojmfsdofi sdoifmjdisfoj fsoidfmjdfij fsdoifmsfij
									dfdosifmj
								</p>
							</div>
						</ZPattern>

						<div className='text-white text-center flex flex-col gap-y-8'>
							<div className='font-bold text-2xl md:text-4xl'>
								Over X server owners are using our bot to do Y
							</div>
							<InviteToServer />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Home;
