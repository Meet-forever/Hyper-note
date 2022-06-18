export const handleModalClick = (e: React.MouseEvent<Element, MouseEvent>,
    changeState: React.Dispatch<React.SetStateAction<boolean>>,
    changeCoordinate: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
    }>>) => {
    changeState(i => !i);
    const THRESHOLDY = 0.80, THRESHOLDX = 0.20;
    let cy = e.clientY, cx = e.clientX;
    const RATIOY = cy / window.innerHeight, RATIOX = cx / window.innerWidth;
    if (RATIOY > THRESHOLDY) cy -= Math.floor(cy * (RATIOY - THRESHOLDY));
    if (RATIOX > THRESHOLDX) cx -= Math.floor(cx * (RATIOX - THRESHOLDX));
    if (window.innerWidth < 670) cx = 5;
    changeCoordinate({
        x: cx,
        y: cy
    })
}