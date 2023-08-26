import { useQuery, useMutation } from "react-query";
import { useState, useReducer, useContext, useRef } from "react";
import { getTeams, postTeam } from "../../requests/teams";
import { getSeasons } from "../../requests/seasons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { GenderContext, UserContext } from "../../contexts/contexts";

import teamArrayFormReducer from "../../reducers/teamSeasonFormReducer";
import Spinner from "../utilitycomponents/spinner";
import TeamForm from "./TeamForm";
import TeamsListHelpModal from "./TeamsListHelpModal";
import SearchSelectionModal from "./SearchSelectionModal";

const Teams = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const topRef = useRef();
  const bottomRef = useRef();
  const { women, dispatch: genderDispatch } = useContext(GenderContext);
  const { user } = useContext(UserContext);
  const [showTeamFormModal, setShowTeamFormModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSearchSelectionModal, setShowSearchSelectionModal] =
    useState(false);
  const [teamFilter, setTeamFilter] = useState("");
  const [valueError, setValueError] = useState({ error: false });
  const initState = location.state
    ? location.state.compObject
    : {
        teamArray: [],
        categoryArray: [
          "qualification",
          "regular",
          "eight",
          "quarter",
          "semi",
          "final",
        ],
        startSeason: "",
        endSeason: "",
      };

  const [formState, compareDispatch] = useReducer(
    teamArrayFormReducer,
    initState,
  );

  const { data, isLoading, error } = useQuery(["teams"], getTeams);
  const {
    data: unFilteredSeasons,
    isLoading: isSeasonsLoading,
    error: seasonError,
  } = useQuery(["seasons"], getSeasons);

  const teamFormMutation = useMutation({
    mutationFn: postTeam,
  });

  if (isLoading || isSeasonsLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    );
  }

  if (error || seasonError) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formState.startSeason === "") {
      formState.startSeason = seasons.pop().seasonId;
    }
    if (formState.endSeason === "") {
      formState.endSeason = seasons.shift().seasonId;
    }
    if (formState.endSeason < formState.startSeason) {
      setValueError({
        error: true,
        message: "Bortre säsongsval lägre än undre val.",
      });
    } else if (formState.categoryArray.length === 0) {
      setValueError({
        error: true,
        message: "Måste ange minst en matchkategori.",
      });
    } else {
      navigate("/compare", { state: { compObject: formState } });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleTeamArrayChange = (event, teamId) => {
    if (event.target.checked) {
      compareDispatch({
        type: "ADD TEAM",
        payload: Number(teamId),
      });
    } else {
      compareDispatch({
        type: "REMOVE TEAM",
        payload: Number(teamId),
      });
    }
  };

  const handleCategoryArrayChange = (event) => {
    if (event.target.checked) {
      compareDispatch({
        type: "ADD CATEGORY",
        payload: event.target.value,
      });
    } else {
      compareDispatch({
        type: "REMOVE CATEGORY",
        payload: event.target.value,
      });
    }
  };

  const handleStartSeasonChange = (event) => {
    compareDispatch({
      type: "INPUT START",
      payload: event.value,
    });
  };

  const handleEndSeasonChange = (event) => {
    compareDispatch({
      type: "INPUT END",
      payload: event.value,
    });
  };

  const scrollTo = (event, ref) => {
    event.preventDefault();
    window.scrollTo(0, ref.current.offsetTop);
  };

  const teams = data
    .filter((team) => team.women === women)
    .filter((team) =>
      team.name.toLowerCase().includes(teamFilter.toLowerCase()),
    );

  const seasons = unFilteredSeasons.filter((season) => season.women === women);
  const reversedSeasons = [...seasons].sort((a, b) => a.seasonId - b.seasonId);
  const startOptions = reversedSeasons.map((season) => {
    return { label: season.year, value: season.seasonId };
  });

  const endOptions = seasons.map((season) => {
    return { label: season.year, value: season.seasonId };
  });

  const unFilteredTeams = data;

  return (
    <div
      ref={topRef}
      className="mx-auto mb-2 min-h-screen max-w-7xl px-1 font-inter text-[#011d29] lg:px-0"
    >
      <div className="w-full">
        <form>
          <input
            className="w-full border-[#011d29] text-[#011d29] focus:border-[#011d29]"
            type="text"
            placeholder="Filter"
            value={teamFilter}
            name="teamFilter"
            onChange={(event) =>
              setTeamFilter(
                event.target.value.replace(/[^a-z0-9\u00C0-\u017F]/gi, ""),
              )
            }
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>
      <div className="my-2 flex h-10 w-full flex-row items-center justify-start pt-2 text-xs lg:text-xl">
        <div>
          {formState.teamArray.length < 5 && !valueError.error && (
            <h3 className="mx-2 font-bold">Valda lag:</h3>
          )}
        </div>
        {formState.teamArray.length < 5 && !valueError.error && (
          <div className="flex flex-row items-center justify-start text-xs lg:text-xl">
            {formState.teamArray.map((teamId) => {
              return (
                <div
                  key={teamId}
                  className="lg:rounded-0 mr-3 rounded-md bg-slate-300 px-1 py-0.5 text-center lg:px-2 lg:py-1"
                >
                  {
                    unFilteredTeams.find((team) => team.teamId === teamId)
                      .shortName
                  }
                </div>
              );
            })}
          </div>
        )}

        {formState.teamArray.length > 4 &&
          formState.categoryArray.length > 0 && (
            <div
              className="text-warning-800 mb-1 mr-2 w-1/3 rounded-lg bg-[#FED7AA] px-1 py-0.5 text-center text-xs font-bold lg:px-2  lg:py-1 lg:text-xl"
              role="alert"
            >
              Välj max 4 lag.
            </div>
          )}

        {valueError.error && (
          <div
            className="text-warning-800 mb-1 mr-2 flex flex-row items-center justify-between rounded-lg bg-[#FED7AA] px-1 py-0.5 text-center text-xs font-bold lg:px-2 lg:py-1 lg:text-xl"
            role="alert"
          >
            <div>{valueError.message}</div>
            <div>
              <button
                type="button"
                className="text-warning-900 hover:text-warning-900 ml-auto box-content rounded-none border-none p-1 opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-alert-dismiss
                aria-label="Close"
                onClick={() => setValueError(false)}
              >
                <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className=" mb-6 flex flex-row-reverse justify-between">
        <div className="mr-1 flex w-1/4 flex-col pt-2 md:flex-row-reverse">
          <div className="float-right flex w-full flex-col items-end pr-0.5 lg:w-3/4 lg:p-0">
            <div
              onClick={() => {
                compareDispatch({ type: "CLEAR TEAMS" });
                genderDispatch({ type: "TOGGLE" });
              }}
              className="mb-4 w-[84px] cursor-pointer rounded-md bg-[#011d29] px-1 py-0.5 text-center text-sm text-white lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-lg"
            >
              {women ? "Herrar" : "Damer"}
            </div>
            <div
              onClick={() => setShowHelpModal(true)}
              className="mb-4 w-[84px] cursor-pointer rounded-md bg-[#011d29] px-1 py-0.5 text-center text-sm text-white lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-lg"
            >
              Hjälp/Info
            </div>
            <div>
              {formState.teamArray.length > 1 && (
                <div
                  onClick={() => setShowSearchSelectionModal(true)}
                  className="mb-4 w-[84px] cursor-pointer rounded-md bg-[#011d29] px-1 py-0.5 text-center text-sm text-white lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-lg"
                >
                  Sökval
                </div>
              )}
            </div>
            {formState.teamArray.length > 1 &&
              formState.teamArray.length < 5 && (
                <div
                  onClick={handleSubmit}
                  className="mb-4 w-[84px] cursor-pointer rounded-md bg-[#011d29] px-1 py-0.5 text-center text-sm text-white lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-lg"
                >
                  Jämför
                </div>
              )}
          </div>

          {user && (
            <p className="text-sm">
              <button onClick={() => setShowTeamFormModal(true)}>
                Lägg till lag
              </button>
            </p>
          )}
          {showTeamFormModal ? (
            <>
              <TeamForm
                mutation={teamFormMutation}
                setShowModal={setShowTeamFormModal}
              />
            </>
          ) : null}
          {showHelpModal ? (
            <>
              <TeamsListHelpModal setShowModal={setShowHelpModal} />
            </>
          ) : null}
          {showSearchSelectionModal ? (
            <>
              <SearchSelectionModal
                setShowModal={setShowSearchSelectionModal}
                formState={formState}
                handleCategoryArrayChange={handleCategoryArrayChange}
                handleEndSeasonChange={handleEndSeasonChange}
                handleStartSeasonChange={handleStartSeasonChange}
                endOptions={endOptions}
                startOptions={startOptions}
                compareDispatch={compareDispatch}
                women={women}
              />
            </>
          ) : null}
        </div>
        <div className="grid w-2/3 grid-cols-1 justify-between gap-x-8 gap-y-2 pt-2 lg:grid-cols-3">
          {teams.map((team) => {
            return (
              <div
                key={team.teamId}
                className="flex flex-row items-center justify-between bg-white px-2 py-1 text-[1.125rem]"
              >
                <Link to={`/teams/${team.teamId}`}>
                  <div className="w-32">{team.casualName}</div>
                </Link>
                <div className="w-6 pl-4 pr-4">
                  <input
                    type="checkbox"
                    id={team.teamId}
                    checked={formState.teamArray.includes(team.teamId)}
                    onChange={(event) =>
                      handleTeamArrayChange(event, team.teamId)
                    }
                    className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div ref={bottomRef}></div>
      <div className="sticky bottom-0 z-20 flex flex-row items-center justify-center gap-2 bg-[#f4f5f5]">
        <div
          onClick={(event) => scrollTo(event, topRef)}
          className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
        >
          Scrolla upp
        </div>
        <div
          onClick={(event) => scrollTo(event, bottomRef)}
          className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
        >
          Scrolla ner
        </div>
      </div>
    </div>
  );
};

export default Teams;
