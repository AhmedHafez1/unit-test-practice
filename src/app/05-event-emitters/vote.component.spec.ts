import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  var component: VoteComponent;

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('should emit the total votes when upvoted', () => {
    let totalVotes = 0;

    component.voteChanged.subscribe((votes) => (totalVotes = votes));

    component.upVote();

    expect(totalVotes).toBe(1);
  });
});
