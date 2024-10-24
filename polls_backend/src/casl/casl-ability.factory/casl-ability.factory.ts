import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { UserEntity } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Action } from '../../enums/action.enum';
import { AnswersEntity } from '../../entities/answers.entity';

type Subjects = InferSubjects<typeof AnswersEntity | typeof UserEntity> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
