//imports
import { swap2ArrayElements } from "../../constants";
import React, { useRef, useEffect, useState } from "react";
import "./Sortingalgo.css";
import SortingNav from "./Sorting_nav";
import bubbleSort from "./algos/Bubblesort";
import Bars from "../../components/Bars/Bars";
import Legends from "./Legends";
import { Table, Button, Slider } from "antd";
import { TableSyntax } from "./SortConstants";
import {
  createRandomArray,
  removeCommaAndMakeArray,
} from "../../components/randomArray/randArr";
import SlideArrayInputTag from "../../components/slideArrayInputTag/slideArrayInputTag";
import insertionSort from "./algos/InsertionSort";
import selectionSort from "./algos/SelectionSort";
import mergeSort from "./algos/MergeSort";
import heapSort from "./algos/HeapSort";

function Sortingalgo() {
  // All useStates
  const MAX_NO_OF_BARS =
    window.innerWidth >= 900
      ? 50
      : window.innerWidth >= 600
      ? 30
      : window.innerWidth >= 500
      ? 25
      : window.innerWidth >= 400
      ? 15
      : 5;
  const [valuerange, setValuerange] = useState(80);
  const [sortSpeed, setSortSpeed] = useState(50);
  const [value2range, setValue2range] = useState(MAX_NO_OF_BARS);
  const [randArr, setrandArr] = useState([]);
  const [compare, setCompare] = useState([]);
  const [swap, setSwap] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [sortStatus, setSortStatus] = useState(false);
  const [sortUsed, setsortUsed] = useState("bubbleSort");
  const arrInputREf = useRef(null);
  const tagToSlideRef = useRef(null);
  //sort stat results array
  const [resultsArr, setResultsArr] = useState([]);
  const MIN = 5;

  //restricting input of array
  useEffect(() => {
    arrInputREf.current.setAttribute(
      "onkeypress",
      "return /^[0-9,\b]+$/i.test(event.key)"
    );
    arrInputREf.current.setAttribute("onpaste", "return false;");
  });

  //getting random array
  useEffect(() => {
    //event listener for shuffle Button so it calls setarr fn
    var shuf_but = document.getElementsByClassName("shuffle_sort")[0];
    shuf_but.addEventListener("click", () => {
      setSortedIndex([]);
      setrandArr(createRandomArray(5, valuerange, value2range));
    });
    setSortedIndex([]);
    setrandArr(createRandomArray(5, valuerange, value2range));

    //removing eventlistener to avoid multiple eventlisteners and abrupt behavior
    return function cleanupListener() {
      shuf_but.removeEventListener("click", () => {
        setSortedIndex([]);
        setrandArr(createRandomArray(5, valuerange, value2range));
      });
    };
  }, [value2range, valuerange]);

  //comma separeted value extraction
 
  //reference for latest value for setTimeout
  const refForSortSpeedLatest = useRef(sortSpeed);
  refForSortSpeedLatest.current = sortSpeed;

  //working fn which calls sort and extract infor from returned array
  const handleSort = () => {
    //visibility time of sorting going on
    let vis_time = 0;

    //async fn and promise used to change setTimeout time intervals
    //so speed can be changed
    async function sortAccOrder(op) {
      //getting order arr which contains sort info
      var order = op[0];

      //creating temporary obj to copy at last in resultsArr
      console.log(sortUsed);
      let tempo = {
        key: 0,
        sort: sortUsed,
        comparison: 0,
        swap: 0,
        vis: 0,
        arrResult: randArr,
        arrUsed: op[1].slice(),
      };

      //looping order array with promise to avoid skipping
      for (let idx = 0; idx < order.length; idx++) {
        function tooth() {
          return new Promise((resolve) => {
            setTimeout(() => {
              //console.log('hi' + idx)
              let [j, k, arr_check, index] = order[idx];

              setCompare([j, k]);

              tempo.comparison++;

              setSwap([]);

              if (index !== null) {
                setSortedIndex((prevState) => [...prevState, index]);
              }

              if (arr_check instanceof Array) {
                tempo.arrResult = arr_check;
                setrandArr(tempo.arrResult);
                if (j !== null || k != null) setSwap([j, k]);
                tempo.swap++;
              } else if (arr_check) {
                //bool
                tempo.arrResult = randArr;
                swap2ArrayElements(tempo.arrResult, j, k);
                //console.log(tempo.arrResult+'  ');
                setrandArr(tempo.arrResult);
                setSwap([j, k]);
                tempo.swap++;
              }
            }, (100 * 40) / refForSortSpeedLatest.current); //dynamic changing of speed

            setTimeout(resolve, (100 * 40) / refForSortSpeedLatest.current); //returning promise
          });
        }
        //performance.now() to get visualiser time took
        let startTime = performance.now();

        await tooth();
        let endTime = performance.now();

        //storing data in tempo obj
        vis_time += endTime - startTime;
        tempo.vis = vis_time;
      }
      //generating new key for table data
      resultsArr.length === 0
        ? (tempo.key = 0)
        : (tempo.key = resultsArr[resultsArr.length - 1].key + 1);
      //appending results arr with tempo
      let updateUsers = [...resultsArr, tempo];

      setResultsArr(updateUsers);

      //sort Sttus false to un-disable Buttons
      setSortStatus(false);
    }

    //sort is starting do this to disable some Buttons
    setSortStatus(true);

    //calling sort
    //  var op = bubbleSort(randArr)
    // var op=insertionSort(randArr)
    // var op=selectionSort(randArr)
    // var op = mergeSort(randArr)
    // var op=heapSort(randArr)
    // console.log(op[1]+" ms");

    // sortAccOrder(op)

    sortUsed === "bubbleSort"
      ? sortAccOrder(bubbleSort(randArr))
      : sortUsed === "insertionSort"
      ? sortAccOrder(insertionSort(randArr))
      : sortUsed === "selectionSort"
      ? sortAccOrder(selectionSort(randArr))
      : sortUsed === "mergeSort"
      ? sortAccOrder(mergeSort(randArr))
      : sortUsed === "heapSort"
      ? sortAccOrder(heapSort(randArr))
      : (() => {
          setSortStatus(false);
        })();
  };

  return (
    <>
      <div className="sorting_container">
        {/* sorting navbar */}
        <SortingNav
          obj={{
            valuerange: valuerange,
            setValuerange: setValuerange,
            handleSort: handleSort,
            setSortedIndex: setSortedIndex,
            sortStatus: sortStatus,
            sortUsed: sortUsed,
            setSortUsed: setsortUsed,
          }}
        />

        <div className="sortingrangearea flex justify-between items-center relative ">
          {/* left align speed bar */}
          <span className="flex absolute top-4 left-1">
            {/* using sliding arrowbar to get down input array */}
            <SlideArrayInputTag tagToSlideRef={tagToSlideRef} />
            <span>
              {" "}
              <div
                className="hiddenToSlide"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  transition: "width 1s",
                }}
                ref={tagToSlideRef}
              >
                <div className="flex h-10">
                  <input
                    type="text"
                    placeholder="Enter array: x,y,...."
                    ref={arrInputREf}
                    className="w-36"
                  />
                  <Button
                    type="primary"
                    disabled={sortStatus}
                    onClick={setInputArr}
                    style={{ height: "2.5rem" }}
                  >
                    Set
                  </Button>
                </div>
              </div>
            </span>
          </span>
          <label className="rangeVertical">
            <div>Speed</div>

            {/* <input
              onChange={(e) => {
                setSortSpeed(e.target.value)
              }}
              className='impleft'
              type='range'
              min={5}
              max={100}
              step={1}
              defaultValue={sortSpeed}
              // transform used to show it vertical
              style={{ transform: 'rotateZ(0.75turn)' }}
            /> */}
            <Slider
              vertical
              className="impleft"
              min={5}
              defaultValue={50}
              onChange={(value) => {
                setSortSpeed(value);
              }}
            />
            <div>{sortSpeed}</div>
          </label>
          {/* middle area for sorting show */}
          <div className="sortingarea">
            {/* bars giving us bars of given data wiith particular colour needed */}
            <div className="barsArea">
              <Bars
                arr={randArr}
                compare={sortStatus && compare}
                swap={sortStatus && swap}
                sorted={sortedIndex}
                // shuffle={didShuffle}
              />
            </div>

            {/*For representation of colours in bars  */}
            <br />
            <Legends />
            <br />

            {/* results shown of sort i table */}
          </div>
          {/* right align num bar */}
          <label className="rangeVertical">
            Num
            {/* <input
              onChange={(e) => {
                setValue2range(e.target.value)
              }}
              className='impright'
              type='range'
              min={5}
              max={MAX_NO_OF_BARS}
              step={1}
              defaultValue={value2range}
              style={{ transform: 'rotateZ(0.75turn)' }}
            /> */}
            <Slider
              vertical
              className="impright"
              min={MIN}
              max={MAX_NO_OF_BARS}
              disabled={sortStatus}
              defaultValue={MAX_NO_OF_BARS}
              onChange={(value) => {
                setValue2range(value);
              }}
            />
            <div>{value2range}</div>
          </label>
        </div>

        <div style={{ backgroundColor: "rgb(233, 233, 240)" }}>
          <br />
          {resultsArr.length === 0 ? (
            <></>
          ) : (
            <Table
              className="mx-auto"
              style={{ width: "75vw" }}
              columns={TableSyntax}
              dataSource={resultsArr}
              pagination={{
                position: ["none", "none"],
              }}
              scroll={{ x: 800, y: 400 }}
            />
          )}
          <br />
        </div>
      </div>
    </>
  );
}
export default Sortingalgo;
