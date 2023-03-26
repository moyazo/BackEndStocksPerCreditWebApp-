

// CALL A TAG GROUPS
/**
 * Cuando guardemos las tag groups, es decir, couando hagams el bulkCreate de todas, llamaremos a la función que nos traer las tags
 * 
 * esperemos que las tags tengan una array de tag groups para hacer esto:
 * 
 * 
 *  tag.forEach((tagResponse) => {
 *      const tag = await Tag.create(tagResponse);
 *      const tagTagGroup = tag.TagGroups.map((tagGroupResponse) => {
 *         const tagGroup = models.TagGroup.findOne({where: {tagGroupId: tagGroupResponse.id});
 *         return tagGroup.id
 *      });
 *     const tagRelation = {
 *                             groupTagId: tagTagGroup,
 *                             tagId: tag.id
 *                         }
 *     const createdRelation = await Tag_Tag_Group.bulkCreate(tagRelation);
 *     
 * })
 */