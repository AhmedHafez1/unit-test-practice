import { VoterComponent } from './voter.component';

describe('voterComponent', () => {
  let component: VoterComponent;
  beforeEach(() => {
    component = new VoterComponent();
  });

  it('should not increment nor emit the object if the myVote property is 1', () => {
    component.myVote = 1;
    let oldTotal = component.totalVotes;
    let obj = undefined;

    component.myVoteChanged.subscribe((value) => (obj = value));

    component.upVote();
    let newTotal = component.totalVotes;

    expect(newTotal).not.toBeGreaterThan(oldTotal);
    expect(obj).toEqual(undefined);
  });

  it('should increment and emit the object if the myVote property is 0', () => {
    let oldTotal = component.totalVotes;
    let obj = undefined;

    component.myVoteChanged.subscribe((value) => (obj = value));

    component.upVote();
    let newTotal = component.totalVotes;

    expect(newTotal).toBe(oldTotal + 1);
    expect(obj).toEqual({ myVote: component.myVote });
  });

  it('should not decrement nor emit the object if the myVote property is -1', () => {
    component.myVote = -1;
    let oldTotal = component.totalVotes;
    let obj = undefined;

    component.myVoteChanged.subscribe((value) => (obj = value));

    component.downVote();
    let newTotal = component.totalVotes;

    expect(newTotal).not.toBeLessThan(oldTotal);
    expect(obj).toEqual(undefined);
  });

  it('should decrement and emit the object if the myVote property is 0', () => {
    let oldTotal = component.totalVotes;
    let obj = undefined;

    component.myVoteChanged.subscribe((value) => (obj = value));

    component.downVote();
    let newTotal = component.totalVotes;

    expect(newTotal).toBeLessThan(oldTotal);
    expect(obj).toEqual({ myVote: component.myVote });
  });
});
