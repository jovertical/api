import { Repository } from 'typeorm'
import Project from 'app/models/Project'
import ProjectImage from 'app/models/ProjectImage'
import Tag from 'app/models/Tag'
import { getRepository, now, slugify } from 'helpers/utils'

// This ain't shit
;(async function() {
  console.log('Seeding Tags...')
  const tagRepo: Repository<Tag> = await getRepository(Tag)

  const tags = await tagRepo.save([
    { name: 'website' },
    { name: 'android' },
    { name: 'ios' },
    { name: 'lamp' },
    { name: 'mern' },
    { name: 'mvc' },
    { name: 'jamstack' },
    { name: 'spa' },
    { name: 'crud' },
    { name: 'booking' },
    { name: 'boilerplate' },
    { name: 'cms' },
    { name: 'admin' },
    { name: 'jobportal' },
    { name: 'portfolio' },
    { name: 'streaming' },
    { name: 'fitness' }
  ])

  console.log('Finished seeding Tags!')

  console.log('Seeding Projects...')

  const projectRepo: Repository<Project> = await getRepository(Project)
  const projectImageRepo: Repository<ProjectImage> = await getRepository(
    ProjectImage
  )

  await projectRepo.save({
    slug: slugify('Pushfit'),
    name: 'Pushfit',
    description:
      "PushFit is the internet's premier video platform for fitness enthusists.",
    startDate: '2019-02-25',
    projectUrl: 'https://pushfit.tv',
    iconUrl:
      'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/pushfit/logo.png',
    featuredAt: now(),
    images: await projectImageRepo.save([
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/pushfit/1.png'
      },
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/pushfit/2.png'
      },
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/pushfit/3.png'
      },
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/pushfit/4.png'
      },
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/pushfit/5.png'
      }
    ]),
    tags: [tags[0], tags[4], tags[5], tags[7], tags[15], tags[16]]
  })

  await projectRepo.save({
    slug: slugify('My Website'),
    name: 'My Website',
    description:
      'My personal website where I showcase my work as a professional.',
    startDate: '2019-10-02',
    sourceUrl: 'https://github.com/palonponjovertlota/me',
    projectUrl: 'https://jovertpalonpon.me',
    iconUrl:
      'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/jovertpalonpon.me/logo.png',
    featuredAt: now(),
    images: await projectImageRepo.save([
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/jovertpalonpon.me/1.png'
      },
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/jovertpalonpon.me/2.png'
      }
    ]),
    tags: [tags[0], tags[5], tags[6], tags[7], tags[14]]
  })

  await projectRepo.save({
    slug: slugify('Workgalore'),
    name: 'Workgalore',
    description: 'Find work from dozens of websites, all in one place.',
    startDate: '2019-06-16',
    projectUrl: 'https://work-galore.com',
    featuredAt: now(),
    iconUrl:
      'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/workgalore/logo.png',
    images: await projectImageRepo.save([
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/workgalore/1.png'
      },
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/workgalore/2.png'
      }
    ]),
    tags: [tags[0], tags[3], tags[5], tags[6], tags[7], tags[13]]
  })

  await projectRepo.save({
    slug: slugify('Laravel React Admin'),
    name: 'Laravel React Admin',
    description: 'A fully featured custom content management system (CMS).',
    startDate: '2018-11-05',
    sourceUrl: 'https://github.com/palonponjovertlota/laravel-react-admin',
    projectUrl: 'https://laravel-react-admin.herokuapp.com',
    featuredAt: now(),
    images: await projectImageRepo.save([
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/laravel-react-admin/1.png'
      },
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/laravel-react-admin/2.png'
      },
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/laravel-react-admin/3.png'
      }
    ]),
    tags: [
      tags[0],
      tags[3],
      tags[5],
      tags[7],
      tags[8],
      tags[10],
      tags[11],
      tags[12]
    ]
  })

  await projectRepo.save({
    slug: slugify('Caribbean Waterpark'),
    name: 'Caribbean Waterpark',
    description:
      'Elegant booking system with landing page for Caribbean Waterpark Resort.',
    startDate: '2018-01-22',
    sourceUrl: 'https://github.com/palonponjovertlota/caribean-waterpark',
    projectUrl: 'https://caribbean-waterpark.herokuapp.com',
    images: await projectImageRepo.save([
      {
        url:
          'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/caribbean-waterpark/1.png'
      }
    ]),
    tags: [
      tags[0],
      tags[3],
      tags[5],
      tags[7],
      tags[8],
      tags[9],
      tags[11],
      tags[12]
    ]
  })

  console.log('Finished seeding Projects!')
})()
