import { createSelector } from 'reselect';

const selectRaw = (state) => state.request.destroy;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.loading,
);

export default {
  selectLoading
};

