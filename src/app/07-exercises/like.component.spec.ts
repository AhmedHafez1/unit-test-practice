import { LikeComponent } from './like.component';

describe('likeComponent', () => {
  let component: LikeComponent;

  beforeEach(() => {
    component = new LikeComponent();
  });

  it('should negate the like property when click', () => {
    let like = component.iLike;

    component.click();

    expect(component.iLike).toBe(!like);

    component.click();

    expect(component.iLike).toBe(like);
  });

  it('should increment the likes if liked and decrement if not liked', () => {
    component.click();

    expect(component.totalLikes).toBe(1);

    component.click();

    expect(component.totalLikes).toBe(0);
  });
});
