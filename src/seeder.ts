import { Repository } from 'typeorm'
import Project from 'app/models/Project'
import ProjectImage from 'app/models/ProjectImage'
import { getRepository, now, slugify } from 'helpers/utils'

console.log('Seeding Projects...')
getRepository(Project)
  .then((projectRepo: Repository<Project>) => {
    getRepository(ProjectImage).then(async (repo: Repository<ProjectImage>) => {
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
        images: await repo.save([
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
        ])
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
        images: await repo.save([
          {
            url:
              'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/jovertpalonpon.me/1.png'
          },
          {
            url:
              'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/jovertpalonpon.me/2.png'
          }
        ])
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
        images: await repo.save([
          {
            url:
              'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/workgalore/1.png'
          },
          {
            url:
              'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/workgalore/2.png'
          }
        ])
      })

      await projectRepo.save({
        slug: slugify('Laravel React Admin'),
        name: 'Laravel React Admin',
        description: 'A fully featured custom content management system (CMS).',
        startDate: '2018-11-05',
        sourceUrl: 'https://github.com/palonponjovertlota/laravel-react-admin',
        projectUrl: 'https://laravel-react-admin.herokuapp.com',
        featuredAt: now(),
        images: await repo.save([
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
        ])
      })

      await projectRepo.save({
        slug: slugify('Caribbean Waterpark'),
        name: 'Caribbean Waterpark',
        description:
          'Elegant booking system with landing page for Caribbean Waterpark Resort.',
        startDate: '2018-01-22',
        sourceUrl: 'https://github.com/palonponjovertlota/caribean-waterpark',
        projectUrl: 'https://caribbean-waterpark.herokuapp.com',
        images: await repo.save([
          {
            url:
              'https://s3-ap-southeast-1.amazonaws.com/jovertpalonpon.me/projects/caribbean-waterpark/1.png'
          }
        ])
      })
    })
  })
  .finally(() => console.log('Finished seeding Projects!'))
