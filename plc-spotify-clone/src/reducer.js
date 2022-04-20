export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  // remove and change to null after dev:
  // token: null,
  token:
    "BQD7kHCXbMlLvXy4dApatPajoOuJLvSHnCRU4Z1S2KGIldOAf9sbFEPD_YVmVqhFNvm4F_s152N29x3hu-4R895cggqQCnlMcOsFTYyZyhw53y-fMNo7lhoCdHv6154_Gw90NtYvoBQJ4hC1Oynnw--xF3vTYD3w57bTbo9qOHh_PxE-Fh7L",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_TOKEN":
      return { ...state, token: action.token };
    case "SET_PLAYLISTS":
      return { ...state, playlists: action.playlists };
    default:
      return state;
  }
};
export default reducer;
