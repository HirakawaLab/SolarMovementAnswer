async function main() {
    const solarSVG = d3.select('#solarSVG');
    const solarSVGcenterX = 400;
    const solarSVGcenterY = 400;
    const solarSVGcircleR = 360;

    drawSolarRuler(solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR);

    const selectCity =document.getElementById('selectCity')
    let myLat = 43.06;
    let myLon = 141.35;

    const selectDate =document.getElementById('selectDate')
    let myYear =2026;
    let myMonth = 3;
    let myDay = 20;
    let days =80;
    document.getElementById('myDate').textContent = myYear + '年' + myMonth + '月' + myDay + '日';
    //console.log(days);

    const rangeTime = document.getElementById('rangeTime');
    let myTime = parseFloat(rangeTime.value);

    const buildingDirection = document.getElementById('selectBuilding');
    const buildingHeight = document.getElementById('selectHeight');
    let myDirection = 'S';
    let myHeight = 1;
    let buildingVertex = drawBuilding(solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, myDirection);

    let sapporoArr = getSolarPosition(myYear, days, myTime, myLat, myLon);
    drawSolar(sapporoArr, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, solarSVG);
    drawShade(sapporoArr, solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, buildingVertex, myHeight);
    getDirectSolarRadiation(sapporoArr, myMonth);

    selectCity.addEventListener('change', async () =>{
        switch (selectCity.value) {
            case "1":
                myLat = 43.06;
                myLon = 141.33;
                break;
            case "2":
                myLat = 35.69;
                myLon = 139.69;
                break;
            case "3":
                myLat = 34.69;
                myLon = 135.50;
                break;
            case "4":
                myLat = 26.21;
                myLon = 127.68;
                break;
            default:
                myLat = 43.06;
                myLon = 141.35;
                console.log('default');
                break;
        }
        days = await getDaysFromNewYearsDay(myYear, myMonth, myDay, myLat, myLon);
        // console.log(days);
        document.getElementById('myDate').textContent = myYear + '年' + myMonth + '月' + myDay + '日';
        myTime = parseFloat(rangeTime.value);
        displayTime(myTime);
        sapporoArr = getSolarPosition(myYear, days, myTime, myLat, myLon);
        document.getElementById('SUN').remove();
        drawSolar(sapporoArr, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, solarSVG);
        solarSVG.selectAll('g').remove();
        drawShade(sapporoArr, solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, buildingVertex, myHeight);
        getDirectSolarRadiation(sapporoArr, myMonth);
        });

    selectDate.addEventListener('change', async () =>{
        switch (selectDate.value) {
            case "1":
                myMonth = 3;
                myDay = 20;
                break;
            case "2":
                myMonth = 6;
                myDay = 21;
                break;
            case "3":
                myMonth = 9;
                myDay = 23;
                break;
            case "4":
                myMonth = 12;
                myDay = 22;
                break;
            case "5":
                myMonth = 4;
                myDay = 8;
                break;
            case "6":
                myMonth = 4;
                myDay = 15;
                break;
            case "7":
                myMonth = 4;
                myDay = 22;
                break;
            case "8":
                myMonth = 4;
                myDay = 29;
                break;
            case "9":
                myMonth = 5;
                myDay = 6;
                break;
            case "10":
                myMonth = 5;
                myDay = 13;
                break;
            case "11":
                myMonth = 5;
                myDay = 20;
                break;
            case "12":
                myMonth = 5;
                myDay = 27;
                break;
            case "13":
                myMonth = 6;
                myDay = 3;
                break;
            default:
                myMonth = 12;
                myDay = 22;
                console.log('default');
                break;
        }
        days = await getDaysFromNewYearsDay(myYear, myMonth, myDay);
        // console.log(days, myLat, myLon);
        document.getElementById('myDate').textContent = myYear + '年' + myMonth + '月' + myDay + '日';
        myTime = parseFloat(rangeTime.value);
        displayTime(myTime);
        sapporoArr = getSolarPosition(myYear, days, myTime, myLat, myLon);
        document.getElementById('SUN').remove();
        drawSolar(sapporoArr, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, solarSVG);
        solarSVG.selectAll('g').remove();
        drawShade(sapporoArr, solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, buildingVertex, myHeight);
        getDirectSolarRadiation(sapporoArr, myMonth);
        });

    rangeTime.addEventListener('change', () =>{
        myTime = parseFloat(rangeTime.value);
        displayTime(myTime);
        sapporoArr = getSolarPosition(myYear, days, myTime, myLat, myLon);
        document.getElementById('SUN').remove();
        drawSolar(sapporoArr, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, solarSVG);
        solarSVG.selectAll('g').remove();
        drawShade(sapporoArr, solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, buildingVertex, myHeight);
        getDirectSolarRadiation(sapporoArr, myMonth);
        });

    selectBuilding.addEventListener('change', async () =>{
        switch (buildingDirection.value) {
            case "2":
                myDirection = 'SW';
                break;
            default:
                myDirection = 'S';
                break;
        }
        document.getElementById('building').remove()
        buildingVertex = drawBuilding(solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, myDirection);
        myTime = parseFloat(rangeTime.value);
        displayTime(myTime);
        sapporoArr = getSolarPosition(myYear, days, myTime, myLat, myLon);
        document.getElementById('SUN').remove();
        drawSolar(sapporoArr, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, solarSVG);
        solarSVG.selectAll('g').remove();
        drawShade(sapporoArr, solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, buildingVertex, myHeight);
        getDirectSolarRadiation(sapporoArr, myMonth);
        });

    selectHeight.addEventListener('change', async () =>{
        switch (buildingHeight.value) {
            case "2":
                myHeight = 2;
                break;
            default:
                myHeight = 1;
                break;
        }
        document.getElementById('building').remove()
        buildingVertex = drawBuilding(solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, myDirection);
        myTime = parseFloat(rangeTime.value);
        displayTime(myTime);
        sapporoArr = getSolarPosition(myYear, days, myTime, myLat, myLon);
        document.getElementById('SUN').remove();
        drawSolar(sapporoArr, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, solarSVG);
        solarSVG.selectAll('g').remove();
        drawShade(sapporoArr, solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, buildingVertex, myHeight);
        getDirectSolarRadiation(sapporoArr, myMonth);
        });

}
main();

function displayTime(myTime){
    document.getElementById('labelHour').textContent = parseInt(myTime) + ' :';
    let tmp = Math.round((myTime - parseInt(myTime)) * 60);
    let myMin = tmp;
    if (tmp < 10) {
        myMin = '0' + tmp;
    }
    document.getElementById('labelMin').textContent = myMin;
}

function displaySunTime(sunTime){
    let tmp = Math.round((sunTime - parseInt(sunTime)) * 60);
    let myMin = tmp;
    if (tmp < 10) {
        myMin = '0' + tmp;
    }
    document.getElementById('sunTime').textContent = "　真太陽時 " + parseInt(sunTime) + ' : ' + myMin;
}

function displayLenShadow(solarH, solarA){
    let tmp = Math.cos(solarH * Math.PI /180) / Math.sin(solarH * Math.PI /180);
    //console.log(solarH);
    document.getElementById('lenShadow').textContent = "　影の長さ " + parseInt(tmp * 100) / 100 + ' 倍';
    document.getElementById('solarAltitude').textContent = "　太陽高度[度] " + solarH;
    document.getElementById('solarAzimuth').textContent = "　太陽方位[度] " + solarA;
}

function drawSolarRuler(mySVG, mySVGcenterX, mySVGcenterY, mySVGcircleR){
    let i = 0, r = mySVGcircleR / 18;

    for (i=1; i<19; i++){
        mySVG.append('circle')
        .attr('cx', mySVGcenterX)
        .attr('cy', mySVGcenterY)
        .attr('r', i * r)
        .style('stroke', 'black')
        .style('stroke-opacity', 0.2)
        .style('fill', 'none')
    }
    for (i=0; i<72; i++){
        mySVG.append('line')
        .attr('x1', Math.cos(i * Math.PI /36) * mySVGcircleR + mySVGcenterX)
        .attr('y1', Math.sin(i * Math.PI /36) * mySVGcircleR + mySVGcenterY)
        .attr('x2', mySVGcenterX)
        .attr('y2', mySVGcenterY)
        .style('stroke', 'black')
        .style('stroke-opacity', 0.2)
    }

    for (i=1; i<7; i++){
        mySVG.append('circle')
        .attr('cx', mySVGcenterX)
        .attr('cy', mySVGcenterY)
        .attr('r', i * r * 3)
        .style('stroke', 'black')
        .style('stroke-opacity', 0.4)
        .style('fill', 'none')
    }
    for (i=0; i<24; i++){
        mySVG.append('line')
        .attr('x1', Math.cos(i * Math.PI /12) * mySVGcircleR + mySVGcenterX)
        .attr('y1', Math.sin(i * Math.PI /12) * mySVGcircleR + mySVGcenterY)
        .attr('x2', mySVGcenterX)
        .attr('y2', mySVGcenterY)
        .style('stroke', 'black')
        .style('stroke-opacity', 0.4)
    }
}

function getDaysFromNewYearsDay(myYear, myMonth, myDay){
    let days;
    switch (myMonth) {
        case 1:
            days= myDay -1;
            break;
        case 2:
            days= 31 + myDay -1;
            break;
        case 3:
            days= 31 + 28 + myDay -1;
            break;
        case 4:
            days= 31 + 28 + 31 + myDay -1;
            break;
        case 5:
            days= 31 + 28 + 31 + 30 + myDay -1;
            break;
        case 6:
            days= 31 + 28 + 31 + 30 + 31 + myDay -1;
            break;
        case 7:
            days= 31 + 28 + 31 + 30 + 31 + 30 + myDay -1;
            break;
        case 8:
            days= 31 + 28 + 31 + 30 + 31 + 30 + 31 + myDay -1;
            break;
        case 9:
            days= 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + myDay -1;
            break;
        case 10:
            days= 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + myDay -1;
            break;
        case 11:
            days= 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + myDay -1;
            break;
        case 12:
            days= 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + myDay -1;
            break;
        default:
            days=79;
            break;
    }
    let NewYearsDay = new Date(myYear, 0, 1);
    let ObserbDay = new Date(myYear, myMonth-1, myDay);
    days = (ObserbDay.getTime() - NewYearsDay.getTime()) / (24 * 60 * 60 * 1000) -1;
    // console.log(NewYearsDay, ObserbDay, days);
    return days
}

function getSolarPosition(myYear, myDays, myHour, myLat, myLon){
    /*
    myLat: 計算対象地点の緯度 (度)
    myLon: 計算対象地点の経度 (度)
    TM:標準時 (時)
    Akasi:標準時の地点の経度 (度) (日本では 135.0)
    sinH: 太陽高度のサイン 
    cosH: 太陽高度のコサイン
    sinA: 太陽方位角のサイン 
    cosA: 太陽方位角のコサイン
    ET: 均時差 (度)
    TT: 時角 (度)
    sinDlt: 赤緯のサイン 
    cosDlt: 赤緯のコサイン
    */
    let RAD = Math.PI / 180 // Radian変換係数
    let dlt0 = -23.4393 // 北半球の冬至の日赤緯（定数）
    let Akasi = 135 // 日本標準時明石経度

    let diffYears = myYear - 1968 //NN
    let diffDays = 3.71 + 0.2596 * diffYears - parseInt((diffYears+3)/4) //D0
    let diffAngle = 0.9856 * (myDays - diffDays) //MM
    
    let ee = 12.3901 + 0.0172 * (diffYears + diffAngle / 360) //EPS
    let vv = diffAngle + 1.914 * Math.sin(diffAngle * RAD)  + 0.02 * Math.sin(2 * diffAngle * RAD)
    // let VEPS = (VV + EPS)
    let tanET2 = 0.043 * Math.sin(2 * (vv + ee) * RAD) / (1 - 0.043 * Math.cos(2 * (vv + ee) * RAD))
    let ET = (diffAngle - vv) - Math.atan(tanET2) / RAD

    let sinDlt = Math.cos((vv + ee) * RAD) * Math.sin(dlt0 * RAD)
    let cosDlt = Math.sqrt(Math.abs(1 - sinDlt * sinDlt))
    let TT = 15 * (myHour - 12) + (myLon - Akasi) + ET //時角
    //let myLatRAD = myLat * RAD
    //let TRAD = TT * RAD
    let sunTime = myHour + (myLon - Akasi + ET) / 15;
    displaySunTime(sunTime);
    // console.log(ET, TT, sunTime);

    let sinH = Math.sin(myLat * RAD) * sinDlt + Math.cos(myLat * RAD) * cosDlt * Math.cos(TT * RAD)
    let cosH = Math.sqrt(1 - sinH * sinH)
    let sinA = cosDlt * Math.sin(TT * RAD) / cosH
    let cosA = (sinH * Math.sin(myLat * RAD) - sinDlt) / (cosH * Math.cos(myLat * RAD))
    let tanH = sinH / cosH
    let tanA = sinA / cosA
    let SapporoH = Math.atan(tanH) / RAD
    let SapporoA
    if (sinA > 0 && cosA < 0){
        SapporoA = Math.atan(tanA) / RAD  + 180
    } else if (sinA < 0 && cosA < 0){
        SapporoA = Math.atan(tanA) / RAD  - 180
    } else {
        SapporoA = Math.atan(tanA) / RAD
    }
    // console.log(SapporoH, SapporoA);
    displayLenShadow(SapporoH, SapporoA)
    return [SapporoH, SapporoA]
}

function drawSolar(sapporoArr, mySVGcenterX, mySVGcenterY, mySVGcircleR, mySVG){
    let solarH = sapporoArr[0]
    let solarA = sapporoArr[1]
    //console.log(solarH, solarA);
    let solarR = (1 - solarH / 90) * mySVGcircleR
    // console.log(solarR);
    let solarX = - Math.sin(solarA * Math.PI /180) * solarR + mySVGcenterX
    let solarY = Math.cos(solarA * Math.PI /180) * solarR + mySVGcenterY
    
    if (solarH > 0){
        mySVG.append('circle')
            .attr('id', 'SUN')
            .attr('cx', solarX)
            .attr('cy', solarY)
            .attr('r', 4)
            .style('stroke', 'none')
            .style('fill', 'red')
            .style('fill-opacity', 0.8)
    } else {
        mySVG.append('circle')
            .attr('id', 'SUN')
            .attr('cx', solarX)
            .attr('cy', solarY)
            .attr('r', 4)
            .style('stroke', 'none')
            .style('fill', 'none')
    }
}

function getDirectSolarRadiation(sapporoArr, myMonth){
    const compass = [-180, -135, -90, -45, 0, 45, 90, 135]
    const J0 = 1367 //太陽定数 W/m2
    // const PP = [.76, .72, .68, .64, .62, .63, .63, .65, .69, .69, .73, .76] // 各月大気透過率　札幌
    const PP = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] // 各月大気透過率　札幌
    const sapporoH = sapporoArr[0]
    const sapporoA = sapporoArr[1]
    let Jdn = 0

    if (sapporoH > 0) {
        Jdn = J0 * Math.pow(PP[myMonth-1], 1/(sapporoH * Math.PI / 180)) //法線面直達日射量 w/m2
    } else {
        Jdn = 0
    }
    let Jdh = Jdn * Math.sin(sapporoH * Math.PI / 180) //水平面直達日射量 w/m2
    let solarTable = document.getElementById('solarTable');
    solarTable.rows[1].cells[0].innerText = Math.round(Jdn * 100) / 100;
    solarTable.rows[1].cells[1].innerText = Math.round(Jdh * 100) / 100;
    // console.log(solarTable)
    let Jdv
    for (let i = 0; i < 8; i++){
        Jdv = Jdn * Math.cos(sapporoH * Math.PI / 180) * Math.cos((sapporoA - compass[i]) * Math.PI / 180) //壁面直達日射量 w/m2
        if (Jdv > 0){
            solarTable.rows[1].cells[i+2].innerText = Math.round(Jdv * 100) / 100;
        } else {
            solarTable.rows[1].cells[i+2].innerText = 0;
        }
        
    }
}

// function drawShade(sapporoArr, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, solarSVG){
//     let solarH = sapporoArr[0]
//     let solarA = sapporoArr[1]
//     let shadeL = solarSVGcircleR /6 / Math.tan(solarH * Math.PI /180)
//     let shadeX = Math.sin(solarA * Math.PI /180) * shadeL + solarSVGcenterX
//     let shadeY = - Math.cos(solarA * Math.PI /180) * shadeL + solarSVGcenterY
    
//     if (solarH > 0){
//         solarSVG.append('line')
//             .attr('id', 'SHADE')
//             .attr('x1', solarSVGcenterX)
//             .attr('y1', solarSVGcenterY)
//             .attr('x2', shadeX)
//             .attr('y2', shadeY)
//             .style('stroke', 'black')
//             .style('stroke-width', 4)
//             .style('stroke-opacity', 0.8)
//     } else {
//         solarSVG.append('line')
//             .attr('id', 'SHADE')
//             .attr('x1', solarSVGcenterX)
//             .attr('y1', solarSVGcenterY)
//             .attr('x2', shadeX)
//             .attr('y2', shadeY)
//             .style('stroke-width', "none")
//     }
// }

function drawBuilding(solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, myDirection){
    let buildingVertex
    if (myDirection == 'SW'){
        let r = solarSVGcircleR / 6;
        let dx = r * Math.cos(Math.PI/4);
        let dy = r * Math.sin(Math.PI/4);
        buildingVertex = [
            [solarSVGcenterX, solarSVGcenterY],
            [solarSVGcenterX - 2*dx, solarSVGcenterY + 2*dy],
            [solarSVGcenterX - 6*dx, solarSVGcenterY - 2*dy],
            [solarSVGcenterX - 4*dx, solarSVGcenterY - 4*dy],
            [solarSVGcenterX - 3*dx, solarSVGcenterY - 3*dy],
            [solarSVGcenterX - 4*dx, solarSVGcenterY - 2*dy],
            [solarSVGcenterX - 2*dx, solarSVGcenterY],
            [solarSVGcenterX - 1*dx, solarSVGcenterY - 1*dy],
            [solarSVGcenterX, solarSVGcenterY],
        ]
    } else {
        let r = solarSVGcircleR / 6;
        buildingVertex = [
            [solarSVGcenterX, solarSVGcenterY],
            [solarSVGcenterX, solarSVGcenterY + 2*r],
            [solarSVGcenterX - 4*r, solarSVGcenterY + 2*r],
            [solarSVGcenterX - 4*r, solarSVGcenterY ],
            [solarSVGcenterX - 3*r, solarSVGcenterY ],
            [solarSVGcenterX - 3*r, solarSVGcenterY + r],
            [solarSVGcenterX - r, solarSVGcenterY + r],
            [solarSVGcenterX - r , solarSVGcenterY ],
            [solarSVGcenterX , solarSVGcenterY ],
        ]
    }

    let buildingPath = d3.path()
    buildingPath.moveTo(buildingVertex[0][0], buildingVertex[0][1])
    buildingPath.lineTo(buildingVertex[1][0], buildingVertex[1][1])
    buildingPath.lineTo(buildingVertex[2][0], buildingVertex[2][1])
    buildingPath.lineTo(buildingVertex[3][0], buildingVertex[3][1])
    buildingPath.lineTo(buildingVertex[4][0], buildingVertex[4][1])
    buildingPath.lineTo(buildingVertex[5][0], buildingVertex[5][1])
    buildingPath.lineTo(buildingVertex[6][0], buildingVertex[6][1])
    buildingPath.lineTo(buildingVertex[7][0], buildingVertex[7][1])
    buildingPath.closePath()
    solarSVG.append('path')
        .attr('id', 'building')
        .attr('d', buildingPath.toString())
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.4)
        .attr('fill', 'red')
        .attr('fill-opacity', 0.2)

    return buildingVertex;
}

function drawShade(sapporoArr, solarSVG, solarSVGcenterX, solarSVGcenterY, solarSVGcircleR, vertex, height){
    console.log(height);
    let solarH = sapporoArr[0];
    let solarA = sapporoArr[1];
    let shadeL = solarSVGcircleR /6 / Math.tan(solarH * Math.PI /180) * height;
    let shadeX = Math.sin(solarA * Math.PI /180) * shadeL;
    let shadeY = - Math.cos(solarA * Math.PI /180) * shadeL;
    let i = 0, j = 0;

    if (solarH > 0){
        let vtxCrossP = []
        for (i=0; i<vertex.length-1; i++){
            let crossP = (vertex[i][0]+shadeX - vertex[i][0]) * (vertex[i+1][1]+shadeY - vertex[i][1]) - (vertex[i][1]+shadeY - vertex[i][1]) * (vertex[i+1][0]+shadeX - vertex[i][0]);
            if (crossP > 0) {
                vtxCrossP.push([vertex[i][0], vertex[i][1]])    
                vtxCrossP.push([vertex[i][0]+shadeX, vertex[i][1]+shadeY])    
                vtxCrossP.push([vertex[i+1][0]+shadeX, vertex[i+1][1]+shadeY])    
            } else {
                vtxCrossP.push([vertex[i][0], vertex[i][1]])    
            }
        }

        let shadowPath = d3.path()
        shadowPath.moveTo(vtxCrossP[0][0], vtxCrossP[0][1])
        for (i=1; i<vtxCrossP.length; i++){
            shadowPath.lineTo(vtxCrossP[i][0], vtxCrossP[i][1])
        }
        shadowPath.closePath()
        let shadows = solarSVG.append('g', 'SHADE')
        shadows.append('path')
            .attr('d', shadowPath.toString())
            .attr('stroke', 'black')
            .attr('stroke-width', 0)
            .attr('stroke-opacity', 0)
            .attr('fill', 'black')
            .attr('fill-opacity', 0.6)

   } else {
        solarSVG.append('line')
            .attr('id', 'SHADE')
            .attr('x1', solarSVGcenterX)
            .attr('y1', solarSVGcenterY)
            .attr('x2', shadeX)
            .attr('y2', shadeY)
            .style('stroke-width', "none")
    }

}

