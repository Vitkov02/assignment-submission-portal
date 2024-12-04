import Joi from 'joi'

export const schema = Joi.object({
  name: Joi.string().min(1).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'any.required': 'Name is required.'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Email must be valid.',
      'string.empty': 'Email is required.',
      'any.required': 'Email is required.'
    }),
  github_repo_url: Joi.string().uri().required().messages({
    'string.uri': 'GitHub URL must be valid.',
    'string.empty': 'Github is required.',
    'any.required': 'GitHub URL is required.'
  }),
  assignment_description: Joi.string().min(10).required().messages({
    'string.base': 'Assignment description must be a string.',
    'string.empty': 'Assignment is required.',
    'string.min': 'Assignment description must be at least 10 characters long.',
    'any.required': 'Assignment description is required.'
  }),
  candidate_level: Joi.string()
    .valid('Junior', 'Middle', 'Senior', 'Principal')
    .required()
    .messages({
      'any.only':
        'Candidate level must be one of Junior, Middle, Senior or Principal.',
      'any.required': 'Candidate level is required'
    })
})
