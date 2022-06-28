import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  // Arrange
  let voteComponent: VoteComponent;

  beforeEach(() => {
    voteComponent = new VoteComponent();
  });

  it('should increment the total votes when upvote', () => {
    // Act
    voteComponent.upVote();

    // Assert
    expect(voteComponent.totalVotes).toBe(1);
  });

  it('should decrement the total votes when downvote', () => {
    // Act
    voteComponent.downVote();

    // Assert
    expect(voteComponent.totalVotes).toBe(-1);
  });
});
