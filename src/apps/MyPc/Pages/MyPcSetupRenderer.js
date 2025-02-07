import "./MyPcSetupRenderer.css";
import "../MyPcRenderer.css";

function MyPcSetupRenderer({ appRef }) {
	return (
		<div className="my-pc-renderer-container">
			<div className="my-pc-renderer-title-container">
				<a className="my-pc-renderer-title">config</a>
			</div>
			<div className="my-pc-renderer-container-2">
				<div className="my-pc-info-father-container">
					<div className="my-pc-info-container">
						<div className="my-pc-title3-container">
							Nvidia GeForce RTX 3060
                            <br/>
                            AMD Ryzen 5 5600 
                            <br/>TUF Gaming B550M Plus 
                            <br/>32 GBytes RAM
							<br/>1TB HD
                            <br/>Watercooler Gamdias Aura 240mm
							<br/>
                            SSD 1TB XPG S70 Blade, PCIe Gen4x4, M.2 NVMe,
							7400MB/5500MB
						</div>
						<div>
							<img src="icons/computer.png" style={{ width: "140px", height: "140px" }}></img>
						</div>
					</div>
				</div>
			</div>
			<div className="my-pc-renderer-title-container">
				<a className="my-pc-renderer-title">setup</a>
			</div>
			<div className="my-pc-renderer-container-2">
				<div className="my-pc-info-father2-container">
					<div className="my-pc-setup-info-container">Mouse Fallen Pantera Pro Headset Corsair Virtuoso <br/>Monitor LG Ultrawide 34wr50qc-b</div>
                    <div className="my-pc-setup-info-container">Keyboard RT100 Epomaker Mousepad Custom </div>
				</div>
			</div>
		</div>
	);
}

export default MyPcSetupRenderer;
